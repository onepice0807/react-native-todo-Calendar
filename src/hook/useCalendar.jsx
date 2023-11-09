import React, { useState } from 'react';
import dayjs from 'dayjs';

const useCalendar = (now) => {
  const [cal, setCal] = useState([]);
  const [selectedDate, setSelectedDate] = useState(now);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn('A date has been picked: ', date);
    setSelectedDate(date);
    hideDatePicker();
  };

  const subtractOneMonth = () => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, 'month');
    setSelectedDate(newSelectedDate);
  };

  const addOneMonth = () => {
    const newSelectedDate = dayjs(selectedDate).add(1, 'month');
    setSelectedDate(newSelectedDate);
  };

  return {
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
  };
};

export default useCalendar;
