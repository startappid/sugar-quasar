// import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
// import { Cookies } from 'quasar'

const axiosInstance = axios.create({
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  baseURL: process.env.BASEURL,
  timeout: 120 * 1000
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}

export { axiosInstance }
