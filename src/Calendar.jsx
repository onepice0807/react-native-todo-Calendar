import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import { MaterialIcons } from '@expo/vector-icons';
import Margin from './hook/Margin';
import { getDayText, getDayColor } from './hook/util';

const columnSize = 32;

const Calendar = ({
  cal,
  selectedDate,
  onPressLeftArrowButton,
  onPressRightArrowButton,
  onPressDate,
  onPressHeader,
  todoList,
}) => {
  const Column = ({
    text,
    color,
    opacity,
    onPress,
    isSelected,
    disabled,
    hasTodo,
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
          <Text
            style={{
              color: color,
              opacity: opacity,
              borderBottomWidth: hasTodo ? 1.5 : 0,
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get('date'); // 일
    const day = dayjs(date).get('day');
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month'); // selectedDate가 현재 달에 속해있는지?

    const hasTodo = todoList.find((todo) =>
      dayjs(todo.date).isSame(dayjs(date), 'date')
    );

    const onPress = () => {
      onPressDate(date);
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
        <Column
          text={dateText}
          color={getDayColor(day)}
          opacity={isCurrentMonth ? 1 : 0.3}
          onPress={onPress}
          isSelected={isSelected}
          hasTodo={hasTodo}
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
          <TouchableOpacity onPress={onPressHeader}>
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
            <Column
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

  return (
    <FlatList
      data={cal}
      renderItem={renderItem}
      keyExtractor={(_, index) => `day-${index}`}
      numColumns={7}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export default Calendar;
