import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'

const REGISTER_ROUTE = '/auth/register'
const VERIFICATION_ROUTE = '/auth/verify'
const LOGIN_ROUTE = '/login'
const CHANGE_PASSWORD = '/user/password'
const FETCH_USER_ROUTE = '/user/profile'
const PASSWORD_FORGOT_ROUTE = '/auth/password/forgot'
const PASSWORD_RESET_ROUTE = '/auth/password/reset'

export function register (state, data) {
  return axiosInstance.post(REGISTER_ROUTE, data)
}

export function login ({ state, commit, dispatch }, data) {
  const p = new Promise(function (resolve, reject) {
    return axiosInstance
      .post(LOGIN_ROUTE, data)
      .then(response => {
        const { data /** , status, statusText, headers, config **/ } = response

        commit('setUser', data.data.user)
        commit('setRoles', data.data.roles)
        commit('loggedIn')
        const token = data.data.token.access_token
        axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
        dispatch('setToken', {
          token: token,
          rememberMe: state.rememberMe
        })
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
  return p
}

export function setToken (state, data) {
  axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + data.token
  if (data.rememberMe) {
    Cookies.set('authorization_token', data.token, {
      expires: 365,
      path: '/'
    })
  } else {
    Cookies.set('authorization_token', data.token, {
      expires: 30,
      path: '/'
    })
  }
}

export async function fetch (state) {
  var token = Cookies.get('authorization_token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token
    return axiosInstance.get(FETCH_USER_ROUTE).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      state.commit('setUser', data.data)
      state.commit('setRoles', data.data.roles)
      state.commit('loggedIn')
    })
  }
}

export function logout (state) {
  Cookies.remove('authorization_token')
  state.commit('setUser', null)
}

export function verify (state, token) {
  return axiosInstance.get(VERIFICATION_ROUTE + '?token=' + token)
}

export function passwordForgot (state, data) {
  return axiosInstance.post(PASSWORD_FORGOT_ROUTE, data)
}

export function passwordReset (state, { token, data }) {
  return axiosInstance.post(PASSWORD_RESET_ROUTE + '?token=' + token, data)
}

export function rememberMe ({ state, commit, dispatch }) {
  commit('rememberMe')
}

export function forgetMe ({ state, commit, dispatch }) {
  commit('forgetMe')
}

export function changePassword ({ state, commit, dispatch }, data) {
  const p = new Promise(function (resolve, reject) {
    return axiosInstance
      .patch(CHANGE_PASSWORD, data)
      .then(response => {
        const { data /** , status, statusText, headers, config **/ } = response
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
  return p
}
