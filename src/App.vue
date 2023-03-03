<!--<template>-->
<!--  <section class="todoapp">-->
<!--    <header class="header">-->
<!--      <h1>todos</h1>-->
<!--      <input class="new-todo" placeholder="What needs to be done?" autofocus>-->
<!--    </header>-->

<!--    <section class="main">-->
<!--        <span class="toggle-all-container">-->
<!--          <input id="toggle-all" class="toggle-all" :checked="activeTodos.length === 0" type="checkbox">-->
<!--          <label for="toggle-all">Mark all as complete</label>-->
<!--        </span>-->

<!--      <ul class="todo-list">-->
<!--        <li-->
<!--          v-for="(todo, index) in todos"-->
<!--          v-bind:key="todo.id"-->
<!--          class="todo-item"-->
<!--          v-bind:class="{ completed: todo.completed }"-->
<!--        >-->
<!--          <input-->
<!--            :id="todo.id"-->
<!--            v-model="todo.completed"-->
<!--            type="checkbox"-->
<!--            class="toggle"-->
<!--          >-->
<!--&lt;!&ndash;          <label :for="todo.id">{{ todo.title }}</label>&ndash;&gt;-->

<!--          <form v-if="false">-->
<!--            <input-->
<!--                type="text"-->
<!--                class="edit"-->
<!--                placeholder="Empty todo will be deleted"-->
<!--                value="Todo is being edited now"-->
<!--            >-->
<!--          </form>-->

<!--          <template v-else>-->
<!--            <label :for="todo.id">{{ todo.title }}</label>-->
<!--            <button class="destroy" v-on:click="todos.splice(index, 1)"></button>-->
<!--          </template>-->
<!--        </li>-->

<!--&lt;!&ndash;        <li class="todo-item completed">&ndash;&gt;-->
<!--&lt;!&ndash;          <input type="checkbox" id="todo-1" class="toggle" checked>&ndash;&gt;-->
<!--&lt;!&ndash;          <label for="todo-1">HTML</label>&ndash;&gt;-->
<!--&lt;!&ndash;          <button class="destroy"></button>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->

<!--&lt;!&ndash;        <li class="todo-item completed">&ndash;&gt;-->
<!--&lt;!&ndash;          <input type="checkbox" id="todo-2" class="toggle" checked>&ndash;&gt;-->
<!--&lt;!&ndash;          <label for="todo-2">CSS</label>&ndash;&gt;-->
<!--&lt;!&ndash;          <button class="destroy"></button>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->

<!--&lt;!&ndash;        <li class="todo-item">&ndash;&gt;-->
<!--&lt;!&ndash;          <input type="checkbox" id="todo-3" class="toggle">&ndash;&gt;-->
<!--&lt;!&ndash;          <label for="todo-3">Javascript</label>&ndash;&gt;-->
<!--&lt;!&ndash;          <button class="destroy"></button>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--      </ul>-->
<!--    </section>-->

<!--    <footer class="footer">-->
<!--        <span class="todo-count">-->
<!--          {{ activeTodos.length }} items left-->
<!--        </span>-->
<!--      <ul class="filters">-->
<!--        <li>-->
<!--          <a href="#/" class="selected" data-filter="all">All</a>-->
<!--        </li>-->
<!--        <li>-->
<!--          <a href="#/active" data-filter="active">Active</a>-->
<!--        </li>-->
<!--        <li>-->
<!--          <a href="#/completed" data-filter="completed">Completed</a>-->
<!--        </li>-->
<!--      </ul>-->
<!--      <button-->
<!--        v-if="activeTodos.length > 0"-->
<!--        @click="this.todos = this.todos.filter(todo => !todo.completed)"-->
<!--        class="clear-completed"-->
<!--      >-->
<!--        Clear completed-->
<!--      </button>-->
<!--    </footer>-->
<!--  </section>-->
<!--  <footer class="info">-->
<!--    <p>Saved on page</p>-->
<!--    &lt;!&ndash; <p>Created by <a href="http://twitter.com/oscargodson">Oscar Godson</a>-->
<!--    </p>-->
<!--    <p>Refactored by <a href="https://github.com/cburgmer">Christoph-->
<!--        Burgmer</a></p>-->
<!--    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p> &ndash;&gt;-->
<!--  </footer>-->
<!--</template>-->

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
    // clearCompletedTodos() {
    //   return this.todos.filter(todo => !todo.completed)
    // }
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

      <section class="todoapp__main">

        <TodoItem
          v-for="(todo, index) in todos"
          v-bind:key="todo.id"
          :todo="todo"
          :index="index"
          @update="todos[index] = $event"
          @delete="todos.splice(index, 1)"
        />
<!--        <div-->
<!--          v-for="(todo, index) in todos"-->
<!--          v-bind:key="todo.id"-->
<!--          v-bind:class="{ completed: todo.completed }"-->
<!--          class="todo"-->
<!--        >-->
<!--          <label class="todo__status-label">-->
<!--            <input-->
<!--                type="checkbox"-->
<!--                class="todo__status"-->
<!--                v-model="todo.completed"-->

<!--            />-->
<!--          </label>-->

<!--          <form v-if="false">-->
<!--            <input-->
<!--                type="text"-->
<!--                class="todo__title-field"-->
<!--                placeholder="Empty todo will be deleted"-->
<!--                value="Todo is being edited now"-->
<!--            />-->
<!--          </form>-->

<!--          <template v-else>-->
<!--            <span class="todo__title">{{ todo.title }}</span>-->
<!--            <button @:click="todos.splice(index, 1)" class="todo__remove">x</button>-->
<!--          </template>-->

<!--&lt;!&ndash;          <div class="modal overlay">&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="modal-background has-background-white-ter"></div>&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="loader"></div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->

<!--        </div>-->
      </section>

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


