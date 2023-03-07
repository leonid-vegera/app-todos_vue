<script>
export default {
  name: "ErrorMessage",
  props: {
    active: Boolean,
  },
  emits: ['closeError'],
  methods: {
    hide() {
      this.$emit('closeError')
    }
  }
};
</script>

<template>
  <article
    class="message"
    :class="{ 'message--hidden': !active}"
  >
    <div class="message-header">
      <slot name="header-text"></slot>
      <button class="delete" @click="hide"></button>
    </div>

    <div class="message-body">
      <slot></slot>
    </div>
  </article>
</template>

<style scoped>

</style>
