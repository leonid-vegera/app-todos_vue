import { client } from "@/api/httpClient";

const userId = 6517;

export const getTodos = () => {
  return client.get(`/todos?userId=${userId}`)
    // .then(() => Promise.reject())
}

export const createTodo = (title) => {
  return client.post('/todos', {
    title,
    completed: false,
    userId: userId,
  })
}

export const updateTodo = ({ id, title, completed }) => {
  return client.patch(`/todos/${id}`, {
    title,
    completed,
  })
}

export const deleteTodo = (todoId) => {
  return client.delete(`/todos/${todoId}`)
}

