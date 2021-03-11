import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
}

export { $axios }

export default {
  auth: {
    login: async (user: { email: string; password: string }) =>
      await $axios.$post('auth/login', user),
    logout: async () => await $axios.$get('auth/logout'),
  },
  user: {
    get: async () => await $axios.$get('user'),
    tracks: async () => await $axios.$get('user/tracks'),
  },
  track: {
    delete: async (id: string) => await $axios.$delete(`track/${id}`),
  },
}
