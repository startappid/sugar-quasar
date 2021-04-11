import { collection } from './collection'

import { countries } from './countries'
import { provinces } from './provinces'
import { cities } from './cities'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/login',
    component: () => import('layouts/UserLogin.vue'),
    children: [
      { path: '', component: () => import('pages/users/login.vue') }
    ]
  },

  { ...countries },
  { ...provinces },
  { ...cities },

  // Default route
  { ...collection },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
