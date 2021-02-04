<template>
    <vs-navbar fixed v-model="active">
      <template #left>
        Icon
      </template>
      <vs-navbar-item :active="this.$route.path === '/'" to="/">
        Home
      </vs-navbar-item>
      <vs-navbar-item :active="this.$route.path === '/library'" to="/library">
        Library
      </vs-navbar-item>
      <template #right>
        <vs-button flat >Login</vs-button>
        <vs-button>Sign Up</vs-button>
      </template>
    </vs-navbar>
</template>

<script>
export default {
  name: "navbar",
  data: ()=>({
    active: 'guide'
  })
}
</script>

<style scoped>

</style>
