import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TODO_WIDTH = 260;

export const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const TODOLIST_KEY = 'myTodoList';

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    // AsyncStorage에서 저장된 할일 목록을 불러와 set
    const result = await AsyncStorage.getItem(TODOLIST_KEY);
    if (result) {
      const newTodoList = JSON.parse(result);
      setTodoList(newTodoList);
    }
  };

  const saveTodoList = (newTodoList) => {
    AsyncStorage.setItem(TODOLIST_KEY, JSON.stringify(newTodoList));
    setTodoList(newTodoList);
  };

  const addTodo = (todo) => {
    // create 작업
    const lastId = todoList.length === 0 ? 0 : todoList[todoList.length - 1].id;

    const newTodoList = [
      ...todoList,
      {
        id: lastId + 1,
        content: todoInput,
        date: dayjs(selectedDate),
        isDone: false,
      },
    ];
    saveTodoList(newTodoList);
  };

  const removeTodo = (targetId) => {
    const newTodoList = todoList.filter((todo) => todo.id !== targetId);
    saveTodoList(newTodoList);
  };

  const modifyTodo = (targetId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id !== targetId) return todo; // map은 새로운 배열 반환 -> 수정될 todo가 아닌경우에도 newTodoList에 넣어지도록 return해야 함.
      return {
        ...todo,
        isDone: !todo.isDone,
      };
    });
    saveTodoList(newTodoList);
  };

  const resetInput = () => setTodoInput('');

  const selectedDateTodoList = todoList.filter((todo) => {
    const isSameDate = dayjs(todo.date).isSame(selectedDate, 'date');
    return isSameDate;
  });

  return {
    todoList,
    setTodoList,
    todoInput,
    setTodoInput,
    addTodo,
    removeTodo,
    modifyTodo,
    resetInput,
    selectedDateTodoList,
  };
};
