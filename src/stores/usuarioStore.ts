import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUsuarioStore = defineStore('usuario', () => {
  const usuario = ref(null);
  const email = ref(null);

  const setUsuario = (data: any) => {
    usuario.value = data.usuario;
    email.value = data.email;
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    localStorage.setItem('email', JSON.stringify(data.email));
  };

  const loadUsuario = () => {
    const storedUser = localStorage.getItem('usuario');
    const storedEmail = localStorage.getItem('email');
    if(storedUser) {
      usuario.value = JSON.parse(storedUser);
      if(storedEmail) {
        email.value = JSON.parse(storedEmail);
      }
    }
  };



  const clearUsuario = () => {
    usuario.value = null;
    email.value = null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('email');
  };

  return {
    usuario,
    email,
    setUsuario,
    loadUsuario,
    clearUsuario
  }
});
