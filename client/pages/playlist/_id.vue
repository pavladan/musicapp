<template>
  <div>
    <button v-on:click="player.play()">play</button>
    <button v-on:click="player.pause()">pause</button>
  </div>
</template>

<script lang="ts">
import flvjs from 'flv.js'
import FlvJs from 'flv.js'
import Player = FlvJs.Player

export default {
  data: function () {
    const player: Player = null
    return {
      player,
    }
  },
  mounted() {
    if (flvjs.isSupported()) {
      this.player = flvjs.createPlayer({
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
