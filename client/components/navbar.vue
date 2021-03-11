<template>
  <vs-navbar fixed>
    <template #left>
      <nuxt-link to="/" class="logo"
        >{{ $config.app_name }}
      </nuxt-link></template
    >
    <vs-navbar-item :active="this.$route.path === '/'" to="/">
      Home
    </vs-navbar-item>
    <vs-navbar-item :active="this.$route.path === '/library'" to="/library">
      Library
    </vs-navbar-item>
    <template #right>
      <template v-if="$store.getters['auth/isAuthenticated']">
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

<script>
import { auth, modals } from '@/store'

export default {
  name: 'navbar',
  methods: {
    openLogin() {
      modals.open('login')
    },
    logout() {
      auth.logout()
    },
  },
}
</script>

<style scoped>
.logo {
  cursor: pointer;
}
</style>
