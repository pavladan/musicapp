<template>
  <vs-navbar fixed>
    <template #left>
      <nuxt-link to="/" class="logo"
        >{{ $config.app_name }}
      </nuxt-link></template
    >
    <vs-navbar-item :active="$route.path === '/'" to="/">
      Home
    </vs-navbar-item>
    <template v-if="isAuth">
      <vs-navbar-item
        :active="$route.path.includes('/collection')"
        to="/collection"
      >
        My music
      </vs-navbar-item>
    </template>
    <template #right>
      <template v-if="isAuth">
        <vs-button transparent @click="logout()" :key="'logout'"
          >Logout</vs-button
        >
      </template>
      <template v-else>
        <vs-button flat @click="openLogin()">Login</vs-button>
        <vs-button @click="openLogin()">Sign Up</vs-button>
      </template>
    </template>
  </vs-navbar>
</template>

<script lang='ts'>
import { auth, modals } from '@/store'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue{
  openLogin() {
    modals.open('login')
  }

  logout() {
    auth.logout()
  }

  get isAuth(){
    return auth.isAuthenticated
  }
}
</script>

<style scoped>
.logo {
  cursor: pointer;
}
</style>
