import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), name: 'indexPage' },
      { path: 'eventosMedicos', component: () => import('pages/MedicalEventsPage.vue'), name: 'medicalEventsPage' },
      { path: 'listarEventosMedicos', component: () => import('pages/MedicalEventsListPage.vue'), name: 'medicalEventsListPage' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
