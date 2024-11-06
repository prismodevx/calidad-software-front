<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <div class="row q-py-lg">
        <div class="col-12 flex flex-center">
          <q-avatar size="100px">
            <img :src="userImg">
          </q-avatar>
        </div>
        <div v-show="isLoadingGeneral" class="col-12 flex column flex-center">
          <q-skeleton type="text" width="30%" height="24px"></q-skeleton>
          <q-skeleton type="text" width="50%" height="24px"></q-skeleton>
        </div>
        <div v-if="!isLoadingGeneral" class="col-12 flex column flex-center">
          <div class="text-grey-9 text-weight-bold text-h6">{{ usuarioStore.usuario }}</div>
          <div class="text-grey-6 text-weight-medium text-subtitle1">{{ usuarioStore.email }}</div>
        </div>

      </div>
      <q-separator/>
      <q-list v-show="isLoadingGeneral">
        <q-item
          clickable
          v-ripple
          v-for="index in 5"
          :key="index"
          class="flex flex-center"
        >
<!--          <q-item-section avatar>-->
<!--            <q-icon size="sm" class="text-grey-6" :name="modulo.icon"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section class="text-weight-medium text-grey-8">{{ modulo.nombre }}</q-item-section>-->
          <q-skeleton type="text" width="100%" height="24px"></q-skeleton>
        </q-item>
      </q-list>
      <q-list v-if="!isLoadingGeneral">
        <q-item
          clickable
          v-ripple
          v-for="modulo in moduloStore.modulos"
          :key="modulo.id"
          :to="modulo.url"
        >
          <q-item-section avatar>
            <q-icon size="sm" class="text-grey-6" :name="modulo.icon"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-grey-8">{{ modulo.nombre }}</q-item-section>
        </q-item>
      </q-list>
      <q-separator/>
      <q-list>
        <q-item
          clickable
          v-ripple
          @click="logout"
        >
          <q-item-section avatar>
            <q-icon size="sm" class="text-grey-6" name="logout"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-grey-8">Cerrar sesion</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container style="background-color: #f4f4f6">
      <q-page style="padding: 64px 96px;">
        <router-view style="margin: 0;"/>
      </q-page>
    </q-page-container>
  </q-layout>


</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Loading } from 'quasar';
import { useRouter } from 'vue-router';
import { useModuloStore } from '../stores/moduloStore';
import { useUsuarioStore } from '../stores/usuarioStore';

const router = useRouter();
const moduloStore = useModuloStore();
const usuarioStore = useUsuarioStore();

const leftDrawerOpen = ref<boolean>(false);
import userImg from '@/assets/user.png';
const isLoadingGeneral = ref(false);

const logout = async () => {
  Loading.show();
  await router.push('/login');
  localStorage.removeItem('token');
  usuarioStore.clearUsuario();
  Loading.hide();
};


onMounted(async () => {
  isLoadingGeneral.value = true;
  await moduloStore.fetchModulos();
  usuarioStore.loadUsuario();
  isLoadingGeneral.value = false;
});
</script>
