import { defineStore } from 'pinia';
import axios from 'axios';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const usePhotosStore = defineStore({
  id: 'photos',
  state: () => ({
    photos: [] as Photo[],
  }),

  actions: {
    async fetchPhotos(albumId: number) {
      try {
        const response = await axios.get<Photo[]>(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        this.photos = response.data;
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    },
  },
});
