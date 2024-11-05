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
        <div class="col-12 flex column flex-center">
          <div class="text-grey-9 text-weight-bold text-h6">Username</div>
          <div class="text-grey-6 text-weight-medium text-subtitle1">email@account.com</div>
        </div>
      </div>
      <q-separator/>
      <q-list>
        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon size="sm" class="text-grey-6" name="manage_accounts"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-grey-8">Roles</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          href="/areas"
        >
          <q-item-section avatar>
            <q-icon size="sm" class="text-grey-6" name="account_balance"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-grey-8">Areas</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon size="sm" class="text-grey-6" name="groups"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-grey-8">Trabajadores</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon size="sm" class="text-grey-6" name="topic"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-grey-8">Cargos</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon size="sm" class="text-grey-6" name="settings"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-grey-8">Configuracion</q-item-section>
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
      <q-page style="padding: 48px;">
        <router-view style="margin: 0;"/>
      </q-page>
    </q-page-container>
  </q-layout>


</template>

<script setup lang="ts">
import { ref } from 'vue';

// const leftDrawerOpen = ref<boolean>(false);

// const toggleLeftDrawer = () => {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// };
import userImg from '@/assets/user.png';
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = async () => {
  localStorage.removeItem('token');
  await router.push('/login');
};

const drawer = ref<boolean>(false);
const miniState = ref<boolean>(true);

const links = [
  {
    url: '/',
    name: 'Dashboard',
    icon: 'dashboard'
  },
  {
    url: '/empleados',
    name: 'Empleados',
    icon: 'groups'
  },
  {
    url: '/areas',
    name: 'Areas',
    icon: 'layers'
  },
  {
    url: '/cargos',
    name: 'Cargos',
    icon: 'work'
  }
];

// import { ref } from 'vue';
// import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

// const essentialLinks: EssentialLinkProps[] = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school',
//     link: 'https://quasar.dev'
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework'
//   },
//   {
//     title: 'Discord Chat Channel',
//     caption: 'chat.quasar.dev',
//     icon: 'chat',
//     link: 'https://chat.quasar.dev'
//   },
//   {
//     title: 'Forum',
//     caption: 'forum.quasar.dev',
//     icon: 'record_voice_over',
//     link: 'https://forum.quasar.dev'
//   },
//   {
//     title: 'Twitter',
//     caption: '@quasarframework',
//     icon: 'rss_feed',
//     link: 'https://twitter.quasar.dev'
//   },
//   {
//     title: 'Facebook',
//     caption: '@QuasarFramework',
//     icon: 'public',
//     link: 'https://facebook.quasar.dev'
//   },
//   {
//     title: 'Quasar Awesome',
//     caption: 'Community Quasar projects',
//     icon: 'favorite',
//     link: 'https://awesome.quasar.dev'
//   }
// ];

// const leftDrawerOpen = ref(false)

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
</script>
