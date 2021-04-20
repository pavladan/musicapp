<template>
  <div class="playlist-cover">
    <img :src='img' v-if='img' alt='cover'/>
    <i class="bx bxs-playlist" v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class PlaylistCover extends Vue{
  @Prop() readonly img!: string
}
</script>

<style scoped lang="scss">
.playlist-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  background: rgb(var(--vs-gray-1));
  height: 100%;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
