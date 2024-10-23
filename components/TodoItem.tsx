import React from 'react';
import { View, Text } from 'react-native';

const TodoItem = ({ todo }: { todo: any }) => {
  return (
    <View className="p-4 border-b text-white font-semibold border-gray-800 dark:border-gray-600 rounded-lg mb-4 shadow-md">
      <Text className="text-white font-semibold mb-3">{todo.description}</Text>
      <Text className="text-white font-semibold mb-3">User Assigned: {todo.userAssigned}</Text>
      <Text className='text-white font-semibold '>Country: {todo.country}</Text>
    </View>
  );
};

export default TodoItem;
