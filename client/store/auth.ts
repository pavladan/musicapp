import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'
import api from '~/utils/api'
import { $vs } from '~/plugins/vuesax'
import { $router } from '~/plugins/router'

@Module({ name: 'auth', stateFactory: true, namespaced: true })
export default class AuthModule extends VuexModule {
  private readonly localStorageUserTitle = 'user'

  user = null
  status: '' | 'loading' | 'success' | 'error' = ''

  constructor(arg: any) {
    super(arg)
    const localStorageUser = localStorage.getItem(this.localStorageUserTitle)
    this.user = localStorageUser ? JSON.parse(localStorageUser) : null
  }
  get isAuthenticated() {
    return !!this.user
  }

  get authStatus() {
    return this.status
  }

  @VuexMutation
  auth_request() {
    this.status = 'loading'
  }
  @VuexMutation
  auth_success(user: any) {
    this.status = 'success'
    this.user = user
    localStorage.setItem(this.localStorageUserTitle, JSON.stringify(user))
  }
  @VuexMutation
  auth_error() {
    this.status = 'error'
    this.user = null
    $vs.notification({
      title: 'Error',
      text: 'Authentication error',
      progress: 'auto',
      color: 'danger',
    })
  }

  @VuexMutation
  logout_success() {
    this.user = null
    localStorage.removeItem(this.localStorageUserTitle)
    this.status = 'success'
  }

  @VuexAction
  async login(user: { email: string; password: string }) {
    this.auth_request()
    try {
      const resp = await api.auth.login(user)
      const respUser = resp.user
      this.auth_success(respUser)
      return respUser
    } catch (err) {
      this.auth_error()
    }
  }

  @VuexAction
  async logout() {
    this.auth_request()
    try {
      await api.auth.logout()
      await $router.push('/')
      this.logout_success()
    } catch (err) {
      this.auth_error()
    }
  }

  @VuexAction
  async checkLogin() {
    this.auth_request()
    try {
      const resp = await api.user.get()
      if (resp.user) {
        this.auth_success(resp.user)
      } else {
        await this.logout()
      }
    } catch (err) {
      await this.auth_error()
    }
  }
}
