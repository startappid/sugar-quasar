import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import resources from './resources'
import auth from './auth'

import banners from './banners'
// CONTENTS:
import faq from './faq'
import terms from './terms'

import countries from './countries'
import provinces from './provinces'
import cities from './cities'

import degrees from './degrees'
import levels from './levels'
import majors from './majors'
import fields from './fields'
import classes from './classes'

import users from './users'
import addresses from './addresses'
import contacts from './contacts'
import files from './files'
import videos from './videos'
import roles from './roles'
import permissions from './permissions'
import sysparam from './sysparam'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      resources,
      auth,

      banners,
      faq,
      terms,

      countries,
      provinces,
      cities,

      degrees,
      levels,
      majors,
      fields,
      classes,

      users,
      addresses,
      contacts,
      files,

      videos,

      roles,
      permissions,
      sysparam

    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    // strict: process.env.DEBUGGING
    strict: false
  })

  return Store
})
