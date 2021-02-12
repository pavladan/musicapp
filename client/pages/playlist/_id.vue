<template></template>

<script>
import socketClient from 'socket.io-client'
let socket

export default {
  created() {
    socket = socketClient(`localhost:4000/playlist/${this.playlistId}`)
    socket.on('playing', console.log)
  },
  destroyed() {
    socket.disconnect()
  },
  async asyncData({ params }) {
    const id = params.id
    return { playlistId: id }
  },
}
</script>

<style scoped></style>
