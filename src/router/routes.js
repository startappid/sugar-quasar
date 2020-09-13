import Store from '../store'
const store = Store()

const routes = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/users/profile.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/users/login.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/users/register.vue') }
    ]
  },
  {
    path: '/forgot',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/users/forgot.vue') }
    ]
  },
  {
    path: '/reset-password',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/users/resetPassword.vue') }
    ]
  },
  {
    path: '/404',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/:collection',
    component: () => import('layouts/AppLayout.vue'),
    beforeEnter: (to, from, next) => {
      const schemes = store.getters['schemes/schemes']
      const { collection } = to.params
      if (schemes.indexOf(collection) >= 0) next()
      else next('/404')
    },
    children: [
      { path: '', component: () => import('pages/resources/index.vue') },
      { path: 'trash', component: () => import('pages/resources/trash.vue') },
      { path: 'create', component: () => import('pages/resources/create.vue') },
      { path: 'report', component: () => import('pages/resources/report.vue') },
      { path: 'import', component: () => import('pages/resources/import.vue') },
      { path: 'export', component: () => import('pages/resources/export.vue') },
      { path: ':id', component: () => import('pages/resources/show.vue') },
      { path: ':id/trashed', component: () => import('pages/resources/trashed.vue') },
      { path: ':id/edit', component: () => import('pages/resources/edit.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
