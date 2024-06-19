<template>
  <div class="albums-container">
    <h1>Album Pengguna</h1>
    <div class="album-table">
      <div class="album-header">
      </div>
      <div class="album-grid">
        <div v-for="album in albums" :key="album.id" class="album-item">
          <router-link :to="'/albums/' + album.id">{{ album.title }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useAlbumsStore } from '../stores/album';

export default defineComponent({
  setup() {
    const albums = ref([]);
    const albumsStore = useAlbumsStore();

    onMounted(async () => {
      await albumsStore.fetchAlbums();
      albums.value = albumsStore.albums;
    });

    return {
      albums,
    };
  },
});
</script>

<style scoped>
/* Container styling */
.albums-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #01012b; /* Dark Navy */
  color: #05d9e8; /* Bright Cyan */
  font-size: 18px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
}

/* Header styling */
.albums-container h1 {
  color: #cfff04; /* Bright Cyan */
  font-size: 40px;
  font-weight: bold;
  margin-bottom: -10px;
}

.album-table {
  width: 100%;
  border-collapse: collapse;
}

/* Header cell styling */
.album-header {
  background-color: #01012b; /* Dark Navy */
  color: #05d9e8; /* Bright Cyan */
  font-weight: bold;
  padding: 10px;
  border-bottom: 2px solid #05d9e8; /* Bright Cyan */
}

/* Grid container for albums */
.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Adjusted for responsive layout */
  gap: 10px;
  margin-top: 20px;
}

/* Each album item styling */
.album-item {
  background-color: #020330; /* Slightly lighter Dark Navy */
  color: #d1f7ff; /* Light Blue */
  padding: 20px;
  border: 1px solid #05d9e8; /* Bright Cyan */
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.album-item a {
  text-decoration: none;
  color: #d1f7ff; /* Light Blue */
  font-size: 1.1rem;
}

/* Hover effect for album items */
.album-item:hover {
  background-color: #05d9e8; /* Bright Cyan */
  transform: translateY(-2px);
  color: #01012b; /* Dark Navy */
}
</style>