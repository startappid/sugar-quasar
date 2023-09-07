import {
  fetch
} from 'src/data/helpers/httpRequest'

export async function fetchRepositories (url, { params, headers = {}, config = {} } = {}) {
  try {
    const data = await fetch(url, { params, headers, ...config })
    return data
  } catch (error) {
    throw error
  }
}
