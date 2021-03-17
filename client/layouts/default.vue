<template>
  <div>
    <navbar />
    <div class="content">
      <Nuxt />
    </div>
    <login-modal />
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import LoginModal from '@/modals/login'
import { auth } from '@/store'

export default {
  components: { Navbar, LoginModal },
  head: {
    bodyAttrs: {
      'vs-theme': 'dark',
    },
  },
  created() {
    auth.checkLogin()
    this.$axios.interceptors.response.use(undefined, async (err) => {
      if (err.response.status === 401) {
        await auth.logout()
        await this.$router.replace('/')
      }
      if (err.response.status === 403) {
      }
      throw err
    })
  },
}
</script>

<style scoped>
.content {
  padding-top: 44px;
}
</style>
