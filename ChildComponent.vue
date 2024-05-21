<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['message-from-child']);

function sendMessage() {
  emit('message-from-child', "Hello from Child!");
}
</script>

<template>
  <div>
    <slot name="header"></slot>
    <p>Message from Parent: {{ message }}</p>
    <button @click="sendMessage">Send Message to Parent</button>
  </div>
</template>

<style scoped>
/* Styles here as needed, omitted for brevity */
</style>