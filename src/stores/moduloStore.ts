import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAlert } from '../composables/useAlert';

export const useModuloStore = defineStore('moduloStore', {
  state: () => ({
    modulos: [] as any[],
    isLoaded: false,
    router: useRouter(),
    alert: useAlert()
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
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          localStorage.removeItem('email');
          await this.router.push('/login');
          // alert({
          //   type: 'error',
          //   title: 'Algo salio mal!',
          //   msg: 'Ha terminado tu sesion'
          // });
        }
      }
    }
  }
})
