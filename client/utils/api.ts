import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApi } from '@/../interfaces/IApi'

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
}

export { $axios }

export default {
  auth: {
    login: async (user: IApi['auth']['login']['post']['req']) =>
      await $axios.$post<IApi['user']['get']['res']>('auth/login', user),
    logout: async () =>
      await $axios.$get<IApi['auth']['logout']['get']['res']>('auth/logout'),
  },
  user: {
    get: async () => await $axios.$get<IApi['user']['get']['res']>('user'),
    tracks: async () =>
      await $axios.$get<IApi['user']['tracks']['get']['res']>('user/tracks'),
  },
  track: {
    add: async (data: IApi['track']['post']['req']) =>
      await $axios.$post<IApi['track']['post']['res']>(`track`, data),
    delete: async (id: string) =>
      await $axios.$delete<IApi['track']['delete']['res']>(`track/${id}`),
  },
}
