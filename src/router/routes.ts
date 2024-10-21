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
        path: '/empleados/',
        component: () => import('pages/empleados/views/Empleados.vue')
      },
      {
        path: '/areas/',
        component: () => import('pages/areas/views/Areas.vue')
      }
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
