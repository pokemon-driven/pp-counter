<template>
  <li
    @click="$emit('click', $event)"
    class="p-4 cursor-pointer border-gray-400 border border-b-0"
    :class="{
      'text-white': active,
      'bg-orange-600': active,
      'hover:bg-gray-100': !active,
    }"
  >
    {{ name }}
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: String,
    active: Boolean,
  },
})
</script>
