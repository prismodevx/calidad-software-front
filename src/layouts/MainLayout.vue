<template>
  <q-layout view="hHh Lpr lff">
      <q-header>
        <q-toolbar>
          <q-toolbar-title>Calidad de Software</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseenter="miniState = false"
        @mouseleave="miniState = true"

        :width="200"
        :breakpoint="500"
        bordered
      >

        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
          <q-list>
            <q-item v-for="link of links" :key="link.name" :to="link.url" clickable v-ripple>
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                {{ link.name }}
              </q-item-section>
            </q-item>
<!--            <q-item :to="'/'" clickable v-ripple>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="inbox" />-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                Dashboard-->
<!--              </q-item-section>-->
<!--            </q-item>-->

<!--            <q-item :to="'/empleados'" active clickable v-ripple>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="star" />-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                Empleados-->
<!--              </q-item-section>-->
<!--            </q-item>-->

<!--            <q-item :to="'/areas'" clickable v-ripple>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="star" />-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                Areas-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-item clickable v-ripple>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="star" />-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                Cargos-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-item clickable v-ripple>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="star" />-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                Permisos-->
<!--              </q-item-section>-->
<!--            </q-item>-->
          </q-list>
        </q-scroll-area>

      </q-drawer>

      <q-page-container>
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
]

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
