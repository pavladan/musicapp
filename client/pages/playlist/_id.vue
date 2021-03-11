<template>
  <div>
    <button v-on:click="player.play()">play</button>
    <button v-on:click="player.pause()">pause</button>
  </div>
</template>

<script>
import FlvJs from 'flv.js'

export default {
  data: function () {
    return {
      player: null,
    }
  },
  mounted() {
    if (FlvJs.isSupported()) {
      this.player = FlvJs.createPlayer({
        type: 'flv',
        isLive: true,
        hasVideo: false,
        url: `${this.$config.streamURL}/${this.playlistId}.flv`,
      })
      this.player.attachMediaElement(new Audio())
      this.player.load()
    }
  },
  async asyncData({ params }) {
    const id = params.id
    return { playlistId: id }
  },
}
</script>

<style scoped></style>
