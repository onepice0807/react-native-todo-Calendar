import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TODO_WIDTH } from './useTodoList';

const AddTodoInput = ({
  value,
  onChangeText,
  onPressAdd,
  placeholder,
  onSubmitEditing,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: TODO_WIDTH,
        alignItems: 'center',
        alignSelf: 'center',
      }}
    >
      <TextInput
        style={{
          flex: 1,
          padding: 5,
          color: '#595959',
        }}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity
        style={{
          padding: 10,
        }}
        onPress={onPressAdd}
      >
        <FontAwesome name='plus-square' size={20} color='#595959' />
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoInput;
