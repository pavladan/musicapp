import { Middleware } from '@nuxt/types'
import { auth } from '~/store'

const authenticated: Middleware = ({ redirect }) => {
  if (!auth.isAuthenticated) {
    return redirect('/')
  }
}
export default authenticated
