import { collection } from './collection'

import { countries } from './countries'
import { provinces } from './provinces'
import { cities } from './cities'

import { users } from './users'
import { addresses } from './addresses'
import { contacts } from './contacts'
import { files } from './files'
import { permissions } from './permissions'
import { roles } from './roles'
import { sysparam } from './sysparam'

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

  { ...users },
  { ...addresses },
  { ...contacts },
  { ...files },
  { ...permissions },
  { ...roles },
  { ...sysparam },

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
