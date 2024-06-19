import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Post from '../views/Post.vue';
import Albums from '../views/Albums.vue';
import Photos from '../views/Photos.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'Post',
    component: Post,
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Albums,
  },
  {
    path: '/albums/:id',
    name: 'Photos',
    component: Photos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
