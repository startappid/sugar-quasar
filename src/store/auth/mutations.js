export function setUser (state, data) {
  state.user = data
}

export function clearUser (state) {
  state.user = null
}

export function setRoles (state, data) {
  state.roles = data
}

export function clearRoles (state) {
  state.roles = []
}

export function setPermissions (state, data) {
  state.permissions = data
}

export function clearPermissions (state) {
  state.permissions = []
}

export function setToken (state, data) {
  state.token = data
}

export function clearToken (state) {
  state.token = []
}

export function loggedIn (state) {
  state.loggedIn = true
}

export function loggedOut (state) {
  state.loggedIn = false
}

export function rememberMe (state) {
  state.rememberMe = true
}

export function forgetMe (state) {
  state.rememberMe = false
}
