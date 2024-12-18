import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/views/Dashboard.vue')
      },
      {
        path: '/trabajadores/',
        component: () => import('pages/trabajadores/views/Trabajadores.vue'),
      },
      {
        path: '/areas/',
        component: () => import('pages/areas/views/Areas.vue')
      },
      {
        path: '/roles/',
        component: () => import('pages/roles/views/Roles.vue')
      },
      {
        path: '/usuarios/',
        component: () => import('pages/usuarios/views/Usuarios.vue')
      },
      {
        path: '/cargos/',
        component: () => import('pages/cargos/views/Cargos.vue')
      },
    ],
    meta: { requiresAuth: true },
  },

  {
    path: '/login',
    component: () => import('pages/login/views/Form.vue'),
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
