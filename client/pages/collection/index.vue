<template></template>

<script>
export default {
  async beforeCreate() {
    await this.$router.replace('collection/tracks')
  },
}
</script>
