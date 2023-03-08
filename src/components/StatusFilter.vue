<script>
export default {
  name: "StatusFilter",
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
};
</script>

<template>
  <nav class="filter">
    <a
      href="#/"
      class="filter__link"
      :class="{ selected: modelValue === 'all'}"
      @click="$emit('update:modelValue', 'all')"
    >
      All
    </a>

    <a
      href="#/active"
      class="filter__link"
      :class="{ selected: modelValue === 'active'}"
      @click="$emit('update:modelValue', 'active')"
    >
      Active
    </a>

    <a
      href="#/completed"
      class="filter__link"
      :class="{ selected: modelValue === 'completed'}"
      @click="$emit('update:modelValue', 'completed')"
    >
      Completed
    </a>
  </nav>
</template>

<style lang="scss" scoped>
.filter {
  display: flex;

&__link {
   margin: 3px;
   padding: 3px 7px;

   color: inherit;
   text-decoration: none;

   border: 1px solid transparent;
   border-radius: 3px;

&:hover {
   border-color: rgba(175, 47, 47, 0.1);
 }

&.selected {
   border-color: rgba(175, 47, 47, 0.2);
 }
}
}

</style>

