import dayjs from 'dayjs';
import { useState } from 'react';

const mockupTodo = [
  {
    id: 1,
    content: '공부하기',
    date: dayjs(),
    isDone: false,
  },
  {
    id: 2,
    content: '영화보기',
    date: dayjs(),
    isDone: true,
  },
  {
    id: 3,
    content: '게임하기',
    date: dayjs(),
    isDone: false,
  },
];

export const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState(mockupTodo);
  const [todoInput, setTodoInput] = useState('');

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
    setTodoList(newTodoList);
  };

  const removeTodo = (targetId) => {
    const newTodoList = todoList.filter((todo) => todo.id !== targetId);
    setTodoList(newTodoList);
  };

  const modifyTodo = (targetId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id !== targetId) return todo; // map은 새로운 배열 반환 -> 수정될 todo가 아닌경우에도 newTodoList에 넣어지도록 return해야 함.
      return {
        ...todo,
        isDone: !todo.isDone,
      };
    });
    setTodoList(newTodoList);
  };

  return {
    todoList,
    setTodoList,
    todoInput,
    setTodoInput,
    addTodo,
    removeTodo,
    modifyTodo,
  };
};
