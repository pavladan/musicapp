import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import modalsStore from './modals'
import authStore from './auth'
import TracksModule from '~/store/tracks'
import PlayerModule from '~/store/player'

let modals: modalsStore
let auth: authStore
let tracks: TracksModule
let player: PlayerModule

const initializer = (store: Store<any>) => {
  modals = getModule(modalsStore, store)
  auth = getModule(authStore, store)
  tracks = getModule(TracksModule, store)
  player = getModule(PlayerModule, store)
}
export const plugins = [initializer]
export { modals, auth, tracks, player }
