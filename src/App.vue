<script>
import StatusFilter from '@/components/StatusFilter.vue';
import TodoItem from "@/components/TodoItem.vue";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/api/todos";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "App",
  data() {
    return {
      todos: [],
      title: '',
      filterStatus: 'all',
      errorMessage: '',
    }
  },
  components: {
    TodoItem,
    StatusFilter,
    ErrorMessage,
  },
  computed: {
    activeTodos() {
      return this.todos.filter(todo => !todo.completed)
    },
    completedTodos() {
      return this.todos.filter(todo => todo.completed)
    },
    visibleTodos() {
      switch(this.filterStatus) {
        case 'active': return this.activeTodos;
        case 'completed': return this.completedTodos;
        default: return this.todos;
      }
    }
  },
  mounted() {
    getTodos()
      .then(({data}) => {
        this.todos = data;
      })
      .catch(() => {
      this.errorMessage = 'Something went wrong'
      })
  },
  methods: {
    handleSubmit() {
      createTodo(this.title)
        .then(({data}) => {
            this.todos.push(data);
            this.title = '';
        });
    },
    updateTodo({id, title, completed}) {
      updateTodo({id, title, completed})
        .then(({ data }) => this.todos = this.todos.map(todo => {
          if (todo.id !== id) {
            return todo;
          }
          return data;
        }));
    },
    removeTodo(todoId) {
      deleteTodo(todoId)
        .then(() => {
          this.todos = this.todos.filter(todo => (
            todo.id !== todoId
          ))
        })
    },
    toggleAllTodos() {
      this.todos.forEach(({id, title, completed}) => {
        return updateTodo({id, title, completed})
          .then(() => this.todos = this.todos.map(todo => {
            return {...todo, completed: !completed}
          }))
      })
    }
  },
}
</script>

<template>
  <div class="todoapp">
    <h1 class="todoapp__title">todos</h1>

    <div class="todoapp__content">
      <header class="todoapp__header">
        <button
          class="todoapp__toggle-all"
          :class="{active: activeTodos.length === 0}"
          @click="toggleAllTodos"
        ></button>

        <form v-on:submit.prevent="handleSubmit">
          <input
            v-model="title"
            type="text"
            class="todoapp__new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <TransitionGroup name="list" tag="section" class="todoapp__main">
        <TodoItem
          v-for="(todo, index) in visibleTodos"
          v-bind:key="todo.id"
          :todo="todo"
          :index="index"
          @update="updateTodo"
          @delete="removeTodo(todo.id)"
        />
      </TransitionGroup>

      <footer class="todoapp__footer">
        <span class="todo-count">
          {{activeTodos.length}} items left
        </span>

        <div class="todoapp__footer-wrapper">
          <StatusFilter
            v-model="filterStatus"
          />

          <button v-if="completedTodos.length > 0" @click="todos = todos.filter(todo => !todo.completed)" class="todoapp__clear-completed">
            Clear completed
          </button>
        </div>
      </footer>
    </div>

    <ErrorMessage :text="errorMessage" class="is-warning"/>
  </div>
</template>

<style>
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
    max-height: 60px;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    max-height: 0;
    transform: scaleY(0);
  }
</style>

