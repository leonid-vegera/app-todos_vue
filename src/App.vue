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
      isLoading: false,
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
      this.isLoading = true;
      createTodo(this.title)
        .then(({data}) => {
            this.todos.push(data);
            this.title = '';
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updateTodo({id, title, completed}) {
      this.isLoading = true;
      updateTodo({id, title, completed})
        .then(({ data }) => this.todos = this.todos.map(todo => {
          if (todo.id !== id) {
            return todo;
          }
          return data;
        }))
        .finally(() => {
          this.isLoading = false;
        });
    },
    removeTodo(todoId) {
      this.isLoading = true;
      deleteTodo(todoId)
        .then(() => {
          this.todos = this.todos.filter(todo => (
            todo.id !== todoId
          ))
        })
        .finally(() => {
          this.isLoading = false;
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

      <transition-group name="list" tag="section" class="todoapp__main">
        <todo-item
          v-for="(todo, index) in visibleTodos"
          v-bind:key="todo.id"
          :todo="todo"
          :index="index"
          @update="updateTodo"
          @delete="removeTodo(todo.id)"
          :is-loading="isLoading"
        ></todo-item>
      </transition-group>

      <footer class="todoapp__footer">
        <span class="todo-count">
          {{activeTodos.length}} items left
        </span>

        <div class="todoapp__footer-wrapper">
          <status-filter
            v-model="filterStatus"
          ></status-filter>

          <button v-if="completedTodos.length > 0" @click="todos = todos.filter(todo => !todo.completed)" class="todoapp__clear-completed">
            Clear completed
          </button>
        </div>
      </footer>
    </div>

    <error-message
      class="is-danger"
      :active="errorMessage !== ''"
      @closeError="errorMessage = ''">
      <template #default>
        {{errorMessage}}
      </template>

      <template #header-text>
        <p>Error</p>
      </template>
    </error-message>
  </div>
</template>

<style lang="scss">
  iframe {
    display: none;
  }

  body {
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto !important;
  }

  .todoapp {
    margin: 40px 20px;

    &__content {
       margin-bottom: 20px;
       font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
       font-size: 24px;
       font-weight: 300;
       color: #4d4d4d;
       background: #fff;
       box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
       0 25px 50px 0 rgba(0, 0, 0, 0.1);
     }

    &__title {
       font-size: 100px;
       font-weight: 100;
       text-align: center;
       color: rgba(175, 47, 47, 0.15);
       text-transform: capitalize;
       -webkit-text-rendering: optimizeLegibility;
       -moz-text-rendering: optimizeLegibility;
       text-rendering: optimizeLegibility;
     }

    &__header {
       position: relative;
     }

    &__toggle-all {
       position: absolute;

       height: 100%;
       width: 45px;

       display: flex;
       justify-content: center;
       align-items: center;

       font-size: 24px;
       color: #e6e6e6;

       border: 0;
       background-color: transparent;
       cursor: pointer;

    &.active {
       color: #737373;
     }

    &:before {
       content: "❯";
       transform: translateY(2px) rotate(90deg);
       line-height: 0;
     }
    }

    &__new-todo {
       box-sizing: border-box;
       width: 100%;
       padding: 16px 16px 16px 60px;

       font-size: 24px;
       line-height: 1.4em;
       font-family: inherit;
       font-weight: inherit;
       color: inherit;
       -webkit-font-smoothing: antialiased;
       -moz-osx-font-smoothing: grayscale;

       border: none;
       background: rgba(0, 0, 0, 0.01);
       box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

    &::placeholder {
       font-style: italic;
       font-weight: 300;
       color: #e6e6e6;
     }
    }

    &__main {
       border-top: 1px solid #e6e6e6;
     }

    &__footer {
       display: flex;
       justify-content: space-between;
       align-items: center;

       box-sizing: content-box;
       height: 20px;
       padding: 10px 15px;

       font-size: 14px;

       color: #777;
       text-align: center;
       border-top: 1px solid #e6e6e6;

       box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
       0 8px 0 -3px #f6f6f6,
       0 9px 1px -3px rgba(0, 0, 0, 0.2),
       0 16px 0 -6px #f6f6f6,
       0 17px 2px -6px rgba(0, 0, 0, 0.2);

    &-wrapper {
       display: flex;
       min-width: 75%;
       justify-content: space-between;
     }
    }

    &__clear-completed {
       margin: 0;
       padding: 0;
       border: 0;

       font-family: inherit;
       font-weight: inherit;
       color: inherit;
       text-decoration: none;

       cursor: pointer;
       background: none;

       -webkit-appearance: none;
       appearance: none;
       -webkit-font-smoothing: antialiased;
       -moz-osx-font-smoothing: grayscale;

    &:hover {
       text-decoration: underline;
     }

    &:active {
       text-decoration: none;
     }
    }
  }

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

