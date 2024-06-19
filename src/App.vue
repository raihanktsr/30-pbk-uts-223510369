<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header">
      <q-toolbar>
        <q-btn-group flat class="rout-nav">
          <router-link to="/">
            <q-btn flat :outline="!isActive('/')" label="Todos" />
          </router-link>
          <router-link to="/posts">
            <q-btn flat :outline="!isActive('/posts')" label="Posts" />
          </router-link>
          <router-link to="/albums">
            <q-btn flat :outline="!isActive('/albums')" label="Albums" />
          </router-link>
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const isActive = (path) => route.path === path;
    return {
      isActive
    };
  }
};
</script>

<style scoped>

/* Aligning with the Cyberpunk Theme */
.header {
  background-color: #01012b !important; /* Dark Navy */
  color: #05d9e8 !important; /* Bright Cyan */
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Soft shadow */
  display: flex;
  justify-content: center;
}

.rout-nav {
  display: flex;
  justify-content: center;
  width: 100%;
}

.rout-nav button {
  color: #05d9e8;
}

.rout-nav a q-btn {
  color: #05d9e8; /* Bright Cyan */
  font-size: 16px;
}

.rout-nav q-btn[flat][outline] {
  border-color: #05d9e8; /* Bright Cyan */
  color: #05d9e8; /* Bright Cyan */
}

.rout-nav button:hover {
  color: #ff2a6d; /* Pink */
}

.rout-nav q-btn[flat][outline]:hover {
  border-color: #ff2a6d; /* Pink */
}

.rout-nav a q-btn[flat]:not([outline]) {
  background-color: #05d9e8; /* Bright Cyan */
  color: #01012b; /* Dark Navy */
}
</style>
