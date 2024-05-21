<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const parentMessage = ref("Hello from Parent!");
const childMessage = ref("");

function handleChildEmit(msg) {
  childMessage.value = msg;
}
</script>

<template>
  <div>
    <header>
      <h1 style="color:aqua; font-size:48px;">Muhammad Raihan Kautsar</h1>
    </header>
    
    <nav>
      <button><RouterLink to="/">TodoList</RouterLink></button>
      <button><RouterLink to="/about">Post</RouterLink></button>
    </nav>

    <main>
      <p>Message from Child: {{ childMessage }}</p>
      <ChildComponent :message="parentMessage" @message-from-child="handleChildEmit">
        <template #header>
          <h2>Child Component Header</h2>
        </template>
      </ChildComponent>
    </main>
  </div>
</template>

<style scoped>
/* Styles here as needed, omitted for brevity */
</style>