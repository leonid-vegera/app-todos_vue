<script>
export default {
  name: "ErrorMessage",
  props: {
    text: String,
  },
};
</script>

<template>
  <article
    class="message"
    :class="{ 'message--hidden': !text}"
  >
    <div class="message-header">
      <p>Error</p>
      <button class="delete"></button>
    </div>

    <div class="message-body">
      {{ text }}
    </div>
  </article>
</template>

<style scoped>

</style>
