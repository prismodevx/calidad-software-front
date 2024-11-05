import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useModuloStore = defineStore('moduloStore', {
  state: () => ({
    modulos: [] as any[],
    isLoaded: false,
  }),
  actions: {
    async fetchModulos() {
      if (!this.isLoaded) {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get('http://localhost:8000/api/modulos', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.modulos = response.data.data;
          this.isLoaded = true;
        } catch (error) {
          console.error('Error al cargar los módulos:', error);
        }
      }
    }
  }
})
