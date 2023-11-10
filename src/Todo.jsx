import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { getCalendarColumns } from './hook/util';

import useCalendar from './hook/useCalendar';
import { useTodoList, TODO_WIDTH } from './hook/useTodoList';
import { FontAwesome5 } from '@expo/vector-icons';
import Calendar from './Calendar';
import Margin from './hook/Margin';
import AddTodoInput from './hook/AddTodoInput';

export default function Todo() {
  const now = dayjs();
  const {
    cal,
    setCal,
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    setDatePickerVisibility,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtractOneMonth,
    addOneMonth,
  } = useCalendar(now);

  const onPressRightArrowButton = addOneMonth;
  const onPressLeftArrowButton = subtractOneMonth;
  const onPressDate = setSelectedDate;
  const onPressHeader = showDatePicker;

  const {
    todoList,
    setTodoList,
    todoInput,
    setTodoInput,
    addTodo,
    removeTodo,
    modifyTodo,
    resetInput,
    selectedDateTodoList,
  } = useTodoList(selectedDate);

  useEffect(() => {
    const columns = getCalendarColumns(selectedDate);
    setCal(columns);

    console.log('selectedDate: ', selectedDate);
  }, [selectedDate]);

  const renderTodoList = ({ item: todo }) => {
    const onPress = () => modifyTodo(todo.id);
    const onLongPress = () => {
      Alert.alert('정말로 삭제하시겠습니까?', '', [
        { style: 'cancel', text: '취소' },
        { style: 'default', text: '확인', onPress: () => removeTodo(todo.id) },
      ]);
    };
    return (
      <Pressable
        style={{
          width: TODO_WIDTH,
          alignSelf: 'center',
          flexDirection: 'row',
          paddingVertical: 14,
          paddingHorizontal: 5,
          borderBottomWidth: 0.8,
          borderColor: '#8535766f',
        }}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <Text style={{ flex: 1, fontSize: 16, color: '#595959' }}>
          {todo.content}
        </Text>
        <Text
          style={{
            color: '#595959',
            fontSize: 16,
            paddingTop: 2.5,
            paddingHorizontal: 8,
          }}
        ></Text>
        <FontAwesome5
          name='calendar-check'
          size={24}
          color={todo.isDone ? '#595959' : '#cccccc'}
        />
      </Pressable>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View>
        <Calendar
          cal={cal}
          todoList={todoList}
          selectedDate={selectedDate}
          onPressLeftArrowButton={onPressLeftArrowButton}
          onPressRightArrowButton={onPressRightArrowButton}
          onPressDate={onPressDate}
          onPressHeader={onPressHeader}
        />
        <Margin height={20} />
      </View>
    );
  };

  const onPressAdd = () => {
    addTodo();
    resetInput();
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          data={selectedDateTodoList}
          keyExtractor={(_, index) => `todo-${index}`}
          renderItem={renderTodoList}
          ListHeaderComponent={ListHeaderComponent}
          ListHeaderComponentStyle={{ alignSelf: 'center' }}
        />

        <AddTodoInput
          value={todoInput}
          placeholder={`${dayjs(selectedDate).format('MM/DD')} 에 해야할 일!!!`}
          onChangeText={setTodoInput}
          onPressAdd={onPressAdd}
          onSubmitEditing={onPressAdd}
        />
      </KeyboardAvoidingView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: getStatusBarHeight() + 10,
  },
});
