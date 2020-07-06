export function user (state) {
  return state.user
}

export function loggedIn (state) {
  return state.loggedIn
}

export function roles (state) {
  return state.roles
}

export function permissions (state) {
  return state.permissions
}

export function token (state) {
  return state.token
}

export function rememberMe (state) {
  return state.rememberMe
}

export const check = state => roles => {
  const user = state.user
  if (user) {
    if (Array.isArray(roles) && roles.length) {
      for (const role of roles) {
        if (!user.roleNames.includes(role)) {
          return false
        }
      }
    } else if (roles) {
      if (!user.roleNames.includes(roles)) {
        return false
      }
    }
    return true
  }
  return false
}
