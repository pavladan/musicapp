import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import modalsStore from './modals'
import authStore from './auth'

let modals: modalsStore
let auth: authStore

const initializer = (store: Store<any>) => {
  modals = getModule(modalsStore, store)
  auth = getModule(authStore, store)
}
export const plugins = [initializer]
export { modals, auth }
