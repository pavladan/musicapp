<template>
  <div>
    <div class="container">
      <h2 class="title">Tracks</h2>
      <vs-button icon gradient circle @click="openAddTrackModal()" title='Add track'>
        <i class="bx bx-plus"></i>
      </vs-button>
    </div>
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th> # </vs-th>
          <vs-th
            sort
            @click="sortedTracks = $vs.sortData($event, tracks, 'title')"
          >
            Title
          </vs-th>
          <vs-th
            sort
            @click="sortedTracks = $vs.sortData($event, tracks, 'artist')"
          >
            Artist
          </vs-th>
          <vs-th> </vs-th>
          <vs-th> </vs-th>
        </vs-tr>
      </template>

      <template #tbody>
        <div class="table_body_loader">
          <loader v-if='loadingTracks' />
        </div>
        <vs-tr
          v-if="!loadingTracks"
          v-for="(track, i) in sortedTracks"
          :key="i"
          :data="track"
          :class="`table-row ${isPlayingTrack(track.id) ? 'playing' : ''}`"
        >
          <vs-td :class="`table-item`">
            <template v-if="isPlayingTrack(track.id)">
              <vs-button
                icon
                transparent
                circle
                class="table-row-play"
                v-if="isPlay"
                @click="pause()"
              >
                <i class="bx bx-pause" />
              </vs-button>
              <vs-button
                icon
                transparent
                circle
                class="table-row-play"
                v-else
                @click="play()"
              >
                <i class="bx bx-play" />
              </vs-button>
            </template>
            <template v-else>
              <span class="table-row-number">
                {{ i + 1 }}
              </span>
              <vs-button
                icon
                transparent
                circle
                class="table-row-play"
                @click="playTrackById(i)"
              >
                <i class="bx bx-play" />
              </vs-button>
            </template>
          </vs-td>
          <vs-td>
            {{ track.title }}
          </vs-td>
          <vs-td>
            {{ track.artist }}
          </vs-td>
          <vs-td>
            <vs-button
              icon
              danger
              transparent
              circle
              @click="deleteTrack(track.id)"
              size="small"
            >
              <i class="bx bxs-trash"></i>
            </vs-button>
          </vs-td>
          <vs-td>
            {{ getSecondHms(track.duration)  }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script lang="ts">
import { modals, player, tracks } from '@/store'
import { ITrack } from '../../../interfaces/ITrack'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import Loader from '~/components/loader.vue'
import secondsToHms from '~/utils/secondsToHms'

@Component({
  components: { Loader },
  middleware: ['authenticated'],
})
export default class Tracks extends Vue {
  sortedTracks: ITrack[] = []

  get tracks() {
    return tracks.tracks
  }
  get loadingTracks() {
    return tracks.loading
  }

  get playingTrackId() {
    return player.hasPlaylist && player.currentTrack && player.currentTrack.id
  }

  get isPlay() {
    return player.hasPlaylist && !player.paused
  }

  isPlayingTrack(id: string) {
    return this.playingTrackId === id
  }

  deleteTrack(id: string) {
    tracks.deleteTrack(id)
  }

  openAddTrackModal() {
    modals.open({name: 'add-track'})
  }

  async fetch() {
    await tracks.update()
  }

  playTrackById(i: number) {
    player.loadPlaylist({ tracks: this.sortedTracks, index: i })
  }
  play() {
    player.play()
  }
  pause() {
    player.pause()
  }

  @Watch('tracks')
  onTrackChanged(value: ITrack[]) {
    this.sortedTracks = value
  }

  getSecondHms(second: string){
    if (!second) return ''
    return secondsToHms(second)
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
}
.title {
  margin: 10px;
}
.table_body_loader {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 20px;
  height: 200px;
  z-index: -1;
}
.table {
  &-row {
    &.playing {
      background: rgb(var(--vs-gray-1));
      .table-row-play {
        visibility: visible;
        opacity: 1;
      }
    }
    &-number {
      transition: var(--transition);
      opacity: 1;
    }
    &-play {
      visibility: hidden;
      position: absolute;
      top: 10px;
      left: 0;
      transition: var(--transition);
      opacity: 0;
    }
    &:hover {
      .table-row-play {
        visibility: visible;
        opacity: 1;
      }
      .table-row-number {
        visibility: hidden;
        opacity: 0;
      }
    }
  }
  &-item {
    position: relative;
  }
}
</style>
