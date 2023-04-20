import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const getTodos = () => {
  return axios.get('./todos')
}

export const createNewTodo = (title) => {
  return axios.post('./todos', {
    title,
  })
}

export const deleteTodo = (todoId) => {
  return axios.delete(`/todos/${todoId}`)
};

export const updateTodo = ({ id, title, completed }) => {
  return axios.put(`/todos/${id}`, {
    title,
    completed,
  })
}

export const updateAll = (todos) => {
  return axios.patch(`/todos?action=update`, {items: todos})
}

export const removeAll = (ids) => {
  return axios.patch(`/todos?action=delete`, { ids })
}

