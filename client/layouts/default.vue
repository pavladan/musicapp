<template>
  <div>
    <navbar />
    <div class="content">
      <Nuxt />
    </div>
    <player />
    <div class='modals'>
      <login-modal />
      <add-track />
      <add-tracks-to-playlist />
    </div>
  </div>
</template>

<script lang="ts">
import { auth } from '@/store'
import { $axios } from '~/utils/api'
import { Component, Vue } from 'vue-property-decorator'
import Navbar from '~/components/navbar.vue'
import LoginModal from '~/modals/login.vue'
import { $router } from '~/plugins/router'
import Player from '~/components/player.vue'
import AddTracksToPlaylist from '~/modals/add-tracks-to-playlist.vue'
import AddTrack from '~/modals/add-track.vue'

@Component({
  components:{
    AddTrack,
    AddTracksToPlaylist,
    Navbar, LoginModal, Player
  },
  head: {
    bodyAttrs: {
      'vs-theme': 'dark',
    },
  },
})
export default class Default extends Vue {
  created() {
    auth.checkLogin()
    $axios.interceptors.response.use(undefined, async (err) => {
      if (err.response.status === 401) {
        await auth.logout()
        await $router.replace('/')
      }
      if (err.response.status === 403) {
      }
      throw err
    })
  }
}
</script>

<style scoped>
.content {
  padding: 44px 20px 82px;
  min-height: 100vh;
}
</style>
