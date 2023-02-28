<!--<script setup>-->
<!--import HelloWorld from './components/HelloWorld.vue'-->
<!--import TheWelcome from './components/TheWelcome.vue'-->
<!--</script>-->

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus>
    </header>

    <section class="main">
        <span class="toggle-all-container">
          <input id="toggle-all" class="toggle-all" type="checkbox">
          <label for="toggle-all">Mark all as complete</label>
        </span>

      <ul class="todo-list">
      </ul>
    </section>

    <footer class="footer">
        <span class="todo-count">
          1 item left
        </span>
      <ul class="filters">
        <li>
          <a href="#/" class="selected" data-filter="all">All</a>
        </li>
        <li>
          <a href="#/active" data-filter="active">Active</a>
        </li>
        <li>
          <a href="#/completed" data-filter="completed">Completed</a>
        </li>
      </ul>
      <button class="clear-completed">Clear completed</button>
    </footer>
  </section>
  <footer class="info">
<!--    <p>Saved in array</p>-->
    <!-- <p>Created by <a href="http://twitter.com/oscargodson">Oscar Godson</a>
    </p>
    <p>Refactored by <a href="https://github.com/cburgmer">Christoph
        Burgmer</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p> -->
  </footer>
<!--  <main>-->
<!--    <TheWelcome />-->
<!--  </main>-->
</template>
