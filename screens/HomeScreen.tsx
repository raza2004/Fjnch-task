import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';

const HomeScreen = () => {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const storedTodos = await AsyncStorage.getItem('todoList');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    };
    loadTodos();
  }, []);

  const addTodo = (todo: any) => {
    setTodos([...todos, todo]);
    Alert.alert('Success', 'Task added successfully.');
  };

  return (
    <ScrollView className="bg-white dark:bg-gray-900">
      <View className="p-4">
        <TodoInput addTodo={addTodo} />
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
