import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'

export async function fetch ({ state, commit, dispatch }, params) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
  }
  const { collection } = state
  const ROUTE_FETCH = `/${collection}`
  const promise = new Promise(function (resolve, reject) {
    return axiosInstance.get(ROUTE_FETCH, { params }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function create ({ state, commit, dispatch }, data) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
  }
  const { collection } = state
  const ROUTE_CREATE = `/${collection}`
  const promise = new Promise(function (resolve, reject) {
    return axiosInstance.post(ROUTE_CREATE, data).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

// TODO: all actions should use this method actions
export async function detail ({ state, commit, dispatch }, payload) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
  }
  const { id, params } = payload
  const { collection } = state
  const ROUTE_DETAIL = `/${collection}/:id`
  const promise = new Promise(function (resolve, reject) {
    return axiosInstance.get(ROUTE_DETAIL.replace(':id', id), { params }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function update ({ state, commit, dispatch }, payload) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
  }
  const { id, data } = payload
  const { collection } = state
  const ROUTE_UPDATE = `/${collection}/:id`
  const promise = new Promise(function (resolve, reject) {
    return axiosInstance.put(ROUTE_UPDATE.replace(':id', id), data).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function patch ({ state, commit, dispatch }, payload) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
  }
  const { id, data } = payload
  const { collection } = state
  const ROUTE_PATCH = `/${collection}/:id`
  const promise = new Promise(function (resolve, reject) {
    return axiosInstance.put(ROUTE_PATCH.replace(':id', id), data).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

// Destroy Model by ID /collection/{id}
// Destroy Collection by selected Ids /collection/selected --params selected=[1,2,3]
// Destroy all Models in Collection /collection/all
export async function destroy ({ state, commit, dispatch }, payload) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
  }
  const { type, data } = payload
  const { collection } = state
  const ROUTE_DESTROY = `/${collection}/:type` // Softdelete
  const promise = new Promise(function (resolve, reject) {
    return axiosInstance.delete(ROUTE_DESTROY.replace(':type', type), { data }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

// Delete Model by ID /collection/{id}/delete
// Delete Collection by selected Ids /collection/selected/delete --params ids=[1,2,3]
// Delete all Models in Collection /collection/all/delete
export async function hardDelete ({ state, commit, dispatch }, payload) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
  }
  const { type, data } = payload
  const { collection } = state
  const ROUTE_DELETE = `/${collection}/:type/delete` // Permanent delete
  const promise = new Promise(function (resolve, reject) {
    return axiosInstance.delete(ROUTE_DELETE.replace(':type', type), { data }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function trash ({ state, commit, dispatch }, params) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
  }
  const { collection } = state
  const ROUTE_TRASH = `/${collection}/trash` // Trash of collection
  const promise = new Promise(function (resolve, reject) {
    return axiosInstance.get(ROUTE_TRASH, { params }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function trashed ({ state, commit, dispatch }, id) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
  }
  const { collection } = state
  const ROUTE_TRASHED = `/${collection}/:id/trashed` // Data trashed detail
  const promise = new Promise(function (resolve, reject) {
    return axiosInstance.get(ROUTE_TRASHED.replace(':id', id)).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

// Restore Model by ID /collection/{id}/restore
// Restore Collection by selected Ids /collection/selected/restore --params selected=[1,2,3]
// Restore all Models in Collection /collection/all/restore
export async function restore ({ state, commit, dispatch }, payload) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
  }
  const { type, data } = payload
  const { collection } = state
  const ROUTE_RESTORE = `/${collection}/:type/restore` // Restore of collection
  const promise = new Promise(function (resolve, reject) {
    return axiosInstance.post(ROUTE_RESTORE.replace(':type', type), data).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}
