<script>
import StatusFilter from '@/components/StatusFilter.vue';
import {initialTodos} from "@/data/todos";
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "App",
  data() {
    let initialTodos = [];
    const jsonTodos = localStorage.getItem('todos') || '[]';
    try {
      initialTodos = JSON.parse(jsonTodos);
    } catch(e) {}

    return {
      todos: initialTodos,
      title: '',
      filterStatus: 'all'
    }
  },
  components: {
    TodoItem,
    StatusFilter,
  },
  // mounted() {
  //   this.todos = JSON.parse(localStorage.getItem('todos'));
  // },
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
  methods: {
    handleSubmit() {
      const newTodo = {
        title: this.title,
        id: Date.now(),
        completed: false,
      };
      this.title && this.todos.push(newTodo);
      this.title = '';
    }
  },
  watch: {
    todos: {
      deep: true,
      handler() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
    }
  }
}
</script>

<template>
  <div class="todoapp">
    <h1 class="todoapp__title">todos</h1>

    <div class="todoapp__content">
      <header class="todoapp__header">
        <button class="todoapp__toggle-all" v-bind:class="{active: activeTodos.length === 0}"></button>

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
          @update="Object.assign(todo, $event)"
          @delete="todos.splice(todos.indexOf(todo), 1)"
        />
      </TransitionGroup>

      <footer class="todoapp__footer">
        <span class="todo-count">
          {{activeTodos.length}} items left
        </span>

<!--          <StatusFilter -->
<!--            :status="filterStatus" -->
<!--            @change="filterStatus = $event"-->
<!--          />-->

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

    <article class="message is-danger message--hidden">
      <div class="message-header">
        <p>Error</p>
        <button class="delete"></button>
      </div>

      <div class="message-body">
        Unable to add a Todo
      </div>
    </article>
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

