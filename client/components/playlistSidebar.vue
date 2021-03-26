<template>
  <vs-sidebar :open.sync="open" right square>
    <template #header> </template>
    <div class="close-btn">
      <vs-button icon @click="close()" circle shadow>
        <i class="bx bx-x" />
      </vs-button>
    </div>

    <vs-table class="playlist-table">
      <template #tbody>
        <vs-tr
          v-for="(track, i) in player.playlist"
          :key="i"
          :class="`row ${player.currentTrack.id === track.id ? 'current' : ''}`"
        >
          <vs-td>
            <div class='cover-container'>
              <empty-cover/>
              <div class="play-pause-btn">
                <vs-button
                  icon
                  circle
                  shadow
                  @click="player.pause()"
                  v-if="!player.paused && player.currentTrack.id === track.id"
                >
                  <i class="bx bx-pause" />
                </vs-button>
                <vs-button
                  icon
                  circle
                  shadow
                  @click="
                  player.setTrackIndex(i)
                  player.play()
                "
                  v-else
                >
                  <i class="bx bx-play" />
                </vs-button>
            </div>

            </div>
          </vs-td>
          <vs-td>
            <div class='cred'>
              <div class='title'>{{ track.title }}</div>
              <div class='artist'>{{ track.artist }}</div>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vs-sidebar>
</template>

<script lang="ts">
import { Component, VModel, Vue } from 'vue-property-decorator'
import { player } from '~/store'
import EmptyCover from '~/components/emptyCover.vue'
@Component({
  components: { EmptyCover }
})
export default class PlaylistSidebar extends Vue {
  @VModel() open!: boolean

  close() {
    this.$emit('input', false)
  }

  get player() {
    return player
  }
}
</script>

<style scoped lang="scss">
.close-btn {
  align-self: flex-end;
}
.row {
  .cover-container{
    position: relative;
    display: flex;
    justify-content: center;
    width: fit-content;
    .play-pause-btn {
      position: absolute;
      opacity: 0;
      transition: var(--transition);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .cred{
    .title{
      font-weight: 500;
    }
    .artist{
      font-size: .8em;
    }
  }
  &.current {
    background: rgb(var(--vs-gray-1));
    .play-pause-btn {
      opacity: 1;
    }
  }
  &:hover {
    .cover-container{
      .play-pause-btn {
        opacity: 1;
      }
    }
  }
}
</style>
<style lang="scss">
.playlist-table {
  table {
    min-width: auto;
  }
}
</style>
