import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { MaterialIcons } from '@expo/vector-icons';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { getCalendarColumns, getDayText, getDayColor } from './hook/util';
import Margin from './hook/Margin';
import useCalendar from './hook/useCalendar';
import { useTodoList } from './hook/useTodoList';
import { FontAwesome5 } from '@expo/vector-icons';

const columnSize = 32;

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

  const {
    todoList,
    setTodoList,
    todoInput,
    setTodoInput,
    addTodo,
    removeTodo,
    modifyTodo,
  } = useTodoList(selectedDate);

  useEffect(() => {
    // if (dayjs(now).isSame(selectedDate, 'month')) {
    // }
    const columns = getCalendarColumns(selectedDate);
    setCal(columns);

    console.log('selectedDate: ', selectedDate);
  }, [selectedDate]);

  const Calendar = ({
    text,
    color,
    opacity,
    onPress,
    isSelected,
    disabled,
  }) => {
    return (
      <View
        style={{
          width: columnSize,
          height: columnSize,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isSelected ? '#d2d2d2' : 'transparent',
          borderRadius: columnSize / 2,
        }}
      >
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          <Text style={{ color: color, opacity: opacity }}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get('date'); // 일
    const day = dayjs(date).get('day');
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month'); // selectedDate가 현재 달에 속해있는지?

    const onPressDate = () => {
      setSelectedDate(date);
    };

    const isSelected = dayjs(date).isSame(selectedDate, 'date');

    return (
      <View
        style={{
          width: columnSize,
          height: columnSize,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Calendar
          text={dateText}
          color={getDayColor(day)}
          opacity={isCurrentMonth ? 1 : 0.3}
          onPress={onPressDate}
          isSelected={isSelected}
        />
      </View>
    );
  };

  const ArrowButton = ({ name, size, color, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
      >
        <MaterialIcons name={name} size={size} color={color} />
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD.');

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ArrowButton
            name='arrow-back-ios'
            size={20}
            color='#404040'
            onPress={onPressLeftArrowButton}
          />
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{ fontSize: 20, color: '#404040' }}>
              {currentDateText}
            </Text>
          </TouchableOpacity>

          <ArrowButton
            name='arrow-forward-ios'
            size={20}
            color='#404040'
            onPress={onPressRightArrowButton}
          />
          <Margin height={15} />
        </View>

        {/* 요일 렌더링 */}
        <View style={{ flexDirection: 'row' }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
            <Calendar
              key={`yoil-${day}`}
              text={getDayText(day)}
              color={getDayColor(day)}
              disabled
            />
          ))}
        </View>
      </>
    );
  };

  const renderTodoList = ({ item: todo }) => {
    const todoDate = dayjs(todo.date).format('hh:mm:ss');
    return (
      <View
        style={{
          width: 260,
          alignSelf: 'center',
          flexDirection: 'row',
          paddingVertical: 14,
          paddingHorizontal: 5,
          borderBottomWidth: 0.8,
          borderColor: '#8535766f',
        }}
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
        >
          {todoDate}
        </Text>
        <FontAwesome5
          name='calendar-check'
          size={24}
          color={todo.isDone ? '#595959' : '#cccccc'}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cal}
        renderItem={renderItem}
        keyExtractor={(_, index) => `day-${index}`}
        numColumns={7}
        ListHeaderComponent={ListHeaderComponent}
      />
      <FlatList
        data={todoList}
        keyExtractor={(_, index) => `todo-${index}`}
        renderItem={renderTodoList}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? getStatusBarHeight() + 10 : 0,
  },
});
