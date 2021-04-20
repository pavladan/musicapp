import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApi } from '@/../interfaces/IApi'
import { IPlaylistDTOClient } from '../../interfaces/IPlaylist'

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
    add: async (data: IApi['track']['post']['req']) => {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('artist', data.artist)
      formData.append('track', data.track)
      return await $axios.$post<IApi['track']['post']['res']>(`track`, formData)
    },
    delete: async (id: string) =>
      await $axios.$delete<IApi['track']['delete']['res']>(`track/${id}`),
  },
}
