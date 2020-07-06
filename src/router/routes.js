const routes = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'user/profile', component: () => import('pages/users/profile.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/users/login.vue') },
      { path: 'register', component: () => import('pages/users/register.vue') },
      { path: 'forgot', component: () => import('pages/users/forgot.vue') },
      { path: 'reset', component: () => import('pages/users/resetPassword.vue') }
    ]
  },
  {
    path: '/users',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/users/index.vue') },
      { path: 'create', component: () => import('pages/users/create.vue') },
      { path: 'trash', component: () => import('pages/users/trash.vue') },
      { path: ':id', component: () => import('pages/users/show.vue') },
      { path: ':id/edit', component: () => import('pages/users/edit.vue') },
      { path: ':id/trashed', component: () => import('pages/users/trashed.vue') }
      // { path: 'trash', component: () => import('pages/users/trash.vue') },
      // { path: 'report', component: () => import('pages/users/report.vue') },
      // { path: 'import', component: () => import('pages/users/import.vue') },
      // { path: 'export', component: () => import('pages/users/export.vue') },
      // { path: ':id/trashed', component: () => import('pages/users/show.vue') },
    ]
  },
  {
    path: '/categories',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/categories/index.vue') },
      { path: 'create', component: () => import('pages/categories/create.vue') },
      { path: ':id', component: () => import('pages/categories/show.vue') },
      { path: ':id/edit', component: () => import('pages/categories/edit.vue') }
      // { path: 'trash', component: () => import('pages/questions/trash.vue') },
      // { path: 'report', component: () => import('pages/questions/report.vue') },
      // { path: 'import', component: () => import('pages/questions/import.vue') },
      // { path: 'export', component: () => import('pages/questions/export.vue') },
      // { path: ':id/trashed', component: () => import('pages/questions/show.vue') },
    ]
  },
  {
    path: '/roles',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/roles/index.vue') },
      { path: 'create', component: () => import('pages/roles/create.vue') },
      { path: 'trash', component: () => import('pages/roles/trash.vue') },
      { path: ':id', component: () => import('pages/roles/show.vue') },
      { path: ':id/edit', component: () => import('pages/roles/edit.vue') },
      { path: ':id/trashed', component: () => import('pages/roles/trashed.vue') }
    ]
  },
  {
    path: '/:collection',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/resources/index.vue') },
      { path: 'trash', component: () => import('pages/resources/trash.vue') },
      { path: 'create', component: () => import('pages/resources/create.vue') },
      { path: 'report', component: () => import('pages/resources/report.vue') },
      { path: 'import', component: () => import('pages/resources/import.vue') },
      { path: 'export', component: () => import('pages/resources/export.vue') },
      { path: ':id', component: () => import('pages/resources/show.vue') },
      { path: ':id/trashed', component: () => import('pages/resources/show.vue') },
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
