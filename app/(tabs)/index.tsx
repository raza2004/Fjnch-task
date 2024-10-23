import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoInput from '../../components/TodoInput';
import TodoItem from '../../components/TodoItem';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install this package

const HomeScreen = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false); // State for theme

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todoList');
        if (storedTodos) {
          const parsedTodos = JSON.parse(storedTodos);
          setTodos(Array.isArray(parsedTodos) ? parsedTodos : []);
        } else {
          setTodos([]);
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
        setTodos([]);
      }
    };

    const loadTheme = async () => {
      const theme = await AsyncStorage.getItem('theme');
      setIsDarkTheme(theme === 'dark'); // Set theme based on stored preference
    };

    loadTodos();
    loadTheme();
  }, []);

  const addTodo = (todo: any) => {
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    AsyncStorage.setItem('todoList', JSON.stringify(updatedTodos));
    Alert.alert('Success', 'Task added successfully.');
  };

  const toggleTheme = async () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    await AsyncStorage.setItem('theme', newTheme); // Store user's theme preference
  };

  return (
    <ScrollView className={`bg-gray-50 ${isDarkTheme ? 'dark:bg-gray-900' : 'bg-white'}`}>
      <View className={`p-6 rounded-lg shadow-lg m-4 ${isDarkTheme ? 'bg-green-800' : 'bg-green-600'}`}>
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-white mb-4">Todo List</Text>
          <TouchableOpacity onPress={toggleTheme}>
            <Icon name={isDarkTheme ? 'wb-sunny' : 'nights-stay'} size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TodoInput addTodo={addTodo} />
        {todos.length > 0 ? (
          todos.map((todo: any, index: number) => (
            <TodoItem key={index} todo={todo} />
          ))
        ) : (
          <View className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Text className="text-center text-gray-600 dark:text-gray-400">No tasks added yet.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
