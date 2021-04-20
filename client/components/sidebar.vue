<template>
  <vs-sidebar :open.sync="open" right square class="sidebar_playlist">
    <template #header> <slot name="header"></slot> </template>
    <div class="close-btn">
      <vs-button icon @click="close()" circle shadow>
        <i class="bx bx-x" />
      </vs-button>
    </div>
    <slot />
  </vs-sidebar>
</template>

<script lang="ts">
import { Component, VModel, Vue } from 'nuxt-property-decorator'
import TrackList from '~/components/trackList.vue'
@Component({
  components: { TrackList },
})
export default class PlaylistSidebar extends Vue {
  @VModel() open!: boolean

  close() {
    this.$emit('input', false)
  }
}
</script>

<style scoped lang="scss">
.close-btn {
  align-self: flex-end;
  position: absolute;
  top: 0;
}
.sidebar_playlist {
  max-width: 300px;
}
</style>
