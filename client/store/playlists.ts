import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'
import api from '~/utils/api'
import { $vs } from '~/plugins/vuesax'
import {
  IPlaylist,
  IPlaylistDTOClient,
} from '../../interfaces/IPlaylist'

@Module({ name: 'playlists', stateFactory: true, namespaced: true })
export default class PlaylistsModule extends VuexModule {
  playlists: IPlaylist[] = []
  errorMessage = ''
  loading = {
    all: false,
    cover: false,
    title: false,
    tracks: false,
  }

  @VuexMutation
  request(type: 'cover' | 'title' | 'tracks' | 'all' = 'all') {
    this.loading[type] = true
    this.errorMessage = ''
  }

  @VuexMutation
  request_success(playlists: IPlaylist[]) {
    this.playlists = playlists
    this.loading = {
      all: false,
      cover: false,
      title: false,
      tracks: false,
    }
  }

  @VuexMutation
  request_error(err: string) {
    this.loading = {
      all: false,
      cover: false,
      title: false,
      tracks: false,
    }
    this.errorMessage = err
    $vs.notification({
      title: 'Error',
      text: err,
      progress: 'auto',
      color: 'danger',
    })
  }

  @VuexAction
  async get() {
    this.request()
    try {
      const playlists = (await api.user.playlists()).playlists
      this.request_success(playlists)
    } catch (err) {
      this.request_error('Error Fetching Playlists')
    }
  }

  @VuexAction
  async getById(id: string) {
    this.request()
    try {
      const playlist = (await api.playlist.get(id)).playlist
      const updatedPlaylists = updatePlaylist(playlist, this.playlists)
      this.request_success(updatedPlaylists)
    } catch (err) {
      this.request_error('Error Fetching Playlist')
    }
  }

  @VuexAction
  async delete(id: string) {
    this.request()
    try {
      await api.playlist.delete(id)
      this.request_success(
        this.playlists.filter((playlist) => playlist.id !== id)
      )
    } catch (err) {
      this.request_error('Error Delete Track')
    }
  }

  @VuexAction
  async add(
    playlist: IPlaylistDTOClient = { title: 'New playlist', trackList: [] }
  ) {
    this.request()
    try {
      const newPlaylist = (await api.playlist.add(playlist)).playlist
      this.request_success([...this.playlists, newPlaylist])
      return newPlaylist
    } catch (err) {
      this.request_error('Playlist adding error')
    }
  }

  @VuexAction
  async edit({
    id,
    partialPlaylist,
  }: {
    id: string
    partialPlaylist: Partial<IPlaylistDTOClient>
  }) {
    if (partialPlaylist.cover) this.request('cover')
    if (partialPlaylist.title) this.request('title')
    if (partialPlaylist.trackList) this.request('tracks')
    try {
      const editedPlaylist = (await api.playlist.edit(id, partialPlaylist))
        .playlist
      const newPlaylists = updatePlaylist(editedPlaylist, this.playlists)
      this.request_success(newPlaylists)
    } catch (err) {
      this.request_error('Playlist edit error')
    }
  }
}

function updatePlaylist(playlist: IPlaylist, playlists: IPlaylist[]) {
  if (playlists.some((p) => p.id === playlist.id)) {
    return playlists.map((p) => {
      if (p.id === playlist.id) {
        return playlist
      }
      return p
    })
  }
  return [...playlists, playlist]
}
