import Store from '../store'
const store = Store()

const routes = [
  {
    path: '/',
    component: async () => await import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: async () => await import('pages/Index.vue') }
    ]
  },
  {
    path: '/profile',
    component: async () => await import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: async () => await import('pages/users/profile.vue') }
    ]
  },
  {
    path: '/login',
    component: async () => await import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: async () => await import('pages/users/login.vue') }
    ]
  },
  {
    path: '/register',
    component: async () => await import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: async () => await import('pages/users/register.vue') }
    ]
  },
  {
    path: '/forgot',
    component: async () => await import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: async () => await import('pages/users/forgot.vue') }
    ]
  },
  {
    path: '/reset-password',
    component: async () => await import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: async () => await import('pages/users/resetPassword.vue') }
    ]
  },
  {
    path: '/404',
    component: async () => await import('pages/Error404.vue')
  },
  // TODO: find the simpler way to import vue file dynamically
  {
    path: '/:collection',
    component: async () => await import('layouts/AppLayout.vue'),
    beforeEnter: (to, from, next) => {
      const schemes = store.getters['schemes/schemes']
      const { collection } = to.params
      if (schemes.indexOf(collection) >= 0) {
        store.commit('sysparam/route', { params: to.params })
        next()
      } else {
        next('/404')
      }
    },
    children: [
      {
        path: '',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/index.vue`)
            if (isExist) {
              return import('pages/' + collection + '/index.vue')
            }
          } catch (error) {
            return import('pages/resources/index.vue')
          }
        }
      },
      {
        path: 'trash',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/trash.vue`)
            if (isExist) {
              return import('pages/' + collection + '/trash.vue')
            }
          } catch (error) {
            return import('pages/resources/trash.vue')
          }
        }
      },
      {
        path: 'create',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/create.vue`)
            if (isExist) {
              return import('pages/' + collection + '/create.vue')
            }
          } catch (error) {
            return import('pages/resources/create.vue')
          }
        }
      },
      {
        path: 'report',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/report.vue`)
            if (isExist) {
              return import('pages/' + collection + '/report.vue')
            }
          } catch (error) {
            return import('pages/resources/report.vue')
          }
        }
      },
      {
        path: 'import',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/import.vue`)
            if (isExist) {
              return import('pages/' + collection + '/import.vue')
            }
          } catch (error) {
            return import('pages/resources/import.vue')
          }
        }
      },
      {
        path: 'export',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/export.vue`)
            if (isExist) {
              return import('pages/' + collection + '/export.vue')
            }
          } catch (error) {
            return import('pages/resources/export.vue')
          }
        }
      },
      {
        path: ':id',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/show.vue`)
            if (isExist) {
              return import('pages/' + collection + '/show.vue')
            }
          } catch (error) {
            return import('pages/resources/show.vue')
          }
        }
      },
      {
        path: ':id/trashed',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/trashed.vue`)
            if (isExist) {
              return import('pages/' + collection + '/trashed.vue')
            }
          } catch (error) {
            return import('pages/resources/trashed.vue')
          }
        }
      },
      {
        path: ':id/edit',
        component: () => {
          try {
            const route = store.getters['sysparam/route']
            const { collection } = route.params
            const isExist = require(`pages/${collection}/edit.vue`)
            if (isExist) {
              return import('pages/' + collection + '/edit.vue')
            }
          } catch (error) {
            return import('pages/resources/edit.vue')
          }
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: async () => await import('pages/Error404.vue')
  })
}

export default routes
