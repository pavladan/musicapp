<template></template>

<script lang='ts'>
import { $router } from '~/plugins/router'

export default {
  async beforeCreate() {
    await $router.replace('/collection/tracks')
  },
}
</script>
