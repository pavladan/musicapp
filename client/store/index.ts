import { Store } from 'vuex'
import { getModule } from 'nuxt-property-decorator'
import modalsStore from './modals'
import authStore from './auth'
import TracksModule from '~/store/tracks'
import PlayerModule from '~/store/player'
import PlaylistsModule from '~/store/playlists'

let modals: modalsStore
let auth: authStore
let tracks: TracksModule
let player: PlayerModule
let playlists: PlaylistsModule

const initializer = (store: Store<any>) => {
  modals = getModule(modalsStore, store)
  auth = getModule(authStore, store)
  tracks = getModule(TracksModule, store)
  player = getModule(PlayerModule, store)
  playlists = getModule(PlaylistsModule, store)
}
export const plugins = [initializer]
export { modals, auth, tracks, player, playlists }
