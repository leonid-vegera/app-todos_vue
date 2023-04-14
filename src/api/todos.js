import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const getTodos = () => {
  return axios.get('./todos')
    // .then(data => todos = data);
}

export const createNewTodo = (title) => {
  return axios.post('./todos', {
    title,
  })
  // .then(data => todos = data);
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

// const userId = 6517;

// export const getTodos = () => {
//   return client.get(`/todos?userId=${userId}`)
//     // .then(() => Promise.reject())   //Generate an error
// }

// export const createTodo = (title) => {
//   return client.post('/todos', {
//     title,
//     completed: false,
//     userId: userId,
//   })
// }

// export const updateTodo = ({ id, title, completed }) => {
//   return client.patch(`/todos/${id}`, {
//     title,
//     completed,
//   })
// }

// export const deleteTodo = (todoId) => {
//   return client.delete(`/todos/${todoId}`)
// };

