import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';

const TodoInput = ({ addTodo }: { addTodo: (todo: any) => void }) => {
  const [description, setDescription] = useState('');
  const [userAssigned, setUserAssigned] = useState('');
  const [country, setCountry] = useState('');
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false); // State for showing suggestions

  // Fetch countries based on user input
  useEffect(() => {
    const fetchCountries = async () => {
      if (country.length > 0) {
        try {
          const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
          const countries = response.data.map((c: any) => c.name.common);
          setCountrySuggestions(countries);
          setShowSuggestions(countries.length > 0); // Show suggestions if available
        } catch (error) {
        //   console.error('Error fetching countries:', error);
          setCountrySuggestions([]); // Clear suggestions on error
        }
      } else {
        setCountrySuggestions([]);
        setShowSuggestions(false); // Hide suggestions if input is empty
      }
    };
    fetchCountries();
  }, [country]);

  const handleAddTodo = () => {
    if (description && userAssigned && country) {
      addTodo({ description, userAssigned, country });
      setDescription('');
      setUserAssigned('');
      setCountry('');
      setShowSuggestions(false); // Close suggestions when adding todo
    } else {
      alert('All fields are required');
    }
  };

  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry); // Set the selected country
    console.log('Selected Country:', selectedCountry);
    if (selectedCountry) {
      setShowSuggestions(false);
      setCountrySuggestions([]); // Close suggestions when selecting a country
    }
  
    
  };

  return (
    <View className="mb-6 flex-3">
      {/* Task Description Input */}
      <View className="mb-4">
        <Text className="text-white font-semibold dark:text-gray-300 mb-1">Task Description</Text>
        <TextInput
          className="border-2 text-white font-semibold border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-2 shadow-sm"
          placeholder="Enter task description"
          maxLength={120}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* User Assigned Input */}
      <View className="mb-4">
        <Text className=" text-white font-semibold dark:text-gray-300 mb-1">User Assigned</Text>
        <TextInput
          className="border text-white font-semibold border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-2 shadow-sm"
          placeholder="Enter user assigned"
          value={userAssigned}
          onChangeText={setUserAssigned}
        />
      </View>

      {/* Country Input */}
      <TouchableWithoutFeedback onPress={() => setShowSuggestions(false)}>
        <View className="mb-4">
          <Text className="text-white font-semibold dark:text-gray-300 mb-1">Country</Text>
          <TextInput
            className="border text-white font-semibold border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-2 shadow-sm"
            placeholder="Enter country"
            value={country}
            onChangeText={text => {
                setCountry(text);
              }}
            onBlur={() => {
                if(!country){
                setShowSuggestions(true)
            } }
            }
          />
          
          {/* Show suggestions if available */}
          {showSuggestions && countrySuggestions.length > 0 && (
            <FlatList
              data={countrySuggestions}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCountrySelect(item)}>
                  <Text className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-b border-gray-300">
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              className="border border-gray-300 dark:border-gray-600 rounded-lg mt-2" // Border for suggestion list
            />
          )}
        </View>
      </TouchableWithoutFeedback>

      <TouchableOpacity className='p-4 rounded-lg mt-1 border border-gray-800 ' style={{backgroundColor:"#003300", justifyContent:"center", alignItems:"center"}} onPress={handleAddTodo}>
      <Text className=' text-white font-bold flex'>Add Task</Text>
    
    </TouchableOpacity>
    </View>
  );
};

export default TodoInput;
