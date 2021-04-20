<template>
  <vs-table class="playlist-table" v-model='selectedTracks'>
    <template #tbody>
      <vs-tr
        v-for="(track, i) in tracks"
        :key="i"
        :class="`row ${isPlayingTrack(track.id) ? 'current' : ''}`"
        :data='track.id'
      >
        <vs-td checkbox v-if="!!selected && !!onChangeSelected">
          <vs-checkbox :val="track.id" v-model="selectedTracks" />
        </vs-td>
        <vs-td class="cover-row">
          <div class="cover-container">
            <empty-track-cover />
            <div class="play-pause-btn">
              <vs-button
                icon
                circle
                shadow
                @click="player.pause()"
                v-if="!player.paused && isPlayingTrack(track.id)"
              >
                <i class="bx bx-pause" />
              </vs-button>
              <vs-button
                icon
                circle
                shadow
                @click="handlePlay(track.id, i)"
                v-else
              >
                <i class="bx bx-play" />
              </vs-button>
            </div>
          </div>
        </vs-td>
        <vs-td>
          <div class="cred">
            <div class="title">{{ track.title }}</div>
            <div class="artist">{{ track.artist }}</div>
          </div>
        </vs-td>
        <vs-td class='time'>
          {{ getSecondHms(track.duration) }}
        </vs-td>

      </vs-tr>
    </template>
  </vs-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { player } from '~/store'
import EmptyTrackCover from '~/components/emptyTrackCover.vue'
import { ITrack } from '../../interfaces/ITrack'
import secondsToHms from '~/utils/secondsToHms'

@Component({
  components: { EmptyTrackCover },
})
export default class TrackList extends Vue {
  @Prop({ required: true }) tracks!: ITrack[]
  @Prop({ default: () => [] }) selected!: string[]
  @Prop() onChangeSelected!: (tracks: string[]) => void

  get player() {
    return player
  }
  get playingTrackId() {
    return player.hasPlaylist && player.currentTrack && player.currentTrack.id
  }

  isPlayingTrack(id: string) {
    return this.playingTrackId === id
  }

  handlePlay(trackId: string, index: number) {
    if (this.isPlayingTrack(trackId)) {
      player.play()
    } else {
      player.loadPlaylist({
        tracks: this.tracks,
        index,
      })
    }
  }

  get selectedTracks() {
    return this.selected
  }

  set selectedTracks(value) {
    this.onChangeSelected && this.onChangeSelected(value)
  }

  getSecondHms(second: string){
    if (!second) return ''
    return secondsToHms(second)
  }
}
</script>

<style scoped lang="scss">
.row {
  .cover-row{
    width: 50px;
  }
  .cover-container {
    position: relative;
    display: flex;
    justify-content: center;
    width: fit-content;
    pointer-events: none;
    .play-pause-btn {
      position: absolute;
      opacity: 0;
      transition: var(--transition);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: auto;
    }
  }
  .cred {
    pointer-events: none;
    .title {
    }
    .artist {
      font-size: 0.8em;
      color: rgba(var(--vs-text), 0.5);
    }
  }
  .time {
    color: rgba(var(--vs-text), 0.5);
    width: 60px;
  }
  &.current {
    background: rgb(var(--vs-gray-1));
    .play-pause-btn {
      opacity: 1;
    }
  }
  &:hover {
    .cover-container {
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
