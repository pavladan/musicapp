<template>
  <div>
    <navbar />
    <div class="content">
      <Nuxt />
    </div>
    <login-modal />
  </div>
</template>

<script lang="ts">
import { auth } from '@/store'
import { $axios } from '~/utils/api'
import { Component, Vue } from 'vue-property-decorator'
import Navbar from '~/components/navbar.vue'
import LoginModal from '~/modals/login.vue'
import { $router } from '~/plugins/router'

@Component({
  components:{
    Navbar, LoginModal
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
  padding-top: 44px;
}
</style>
