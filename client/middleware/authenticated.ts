import { Middleware } from '@nuxt/types'

const authenticated: Middleware = ({ store, redirect }) => {
  if (!store.getters['auth/isAuthenticated']) {
    return redirect('/')
  }
}
export default authenticated
