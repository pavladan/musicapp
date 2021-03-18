<template>
  <div>
    <div class="item">
      <h2 class="title">Tracks</h2>
      <vs-button icon gradient circle @click="openAddTrackModal()">
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
        <div class="table_body_loader" ref="bodyContent"></div>
        <vs-tr
          v-if="!loading"
          v-for="(track, i) in sortedTracks"
          :key="i"
          :data="track"
        >
          <vs-td>
            {{ i + 1 }}
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
            {{ track.durationHms }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <add-track-modal />
  </div>
</template>

<script lang="ts">
import secondsToHms from '~/utils/secondsToHms'
import { modals, tracks } from '@/store'
import { ITrack } from '../../../interfaces/ITrack'
import { $vs } from '~/plugins/vuesax'
import { Component, Vue, Watch } from 'vue-property-decorator'
import AddTrackModal from '~/modals/add-track.vue'
let tableLoader: any

@Component({
  components: { AddTrackModal },
  middleware: ['authenticated'],
})
export default class Tracks extends Vue {
  sortedTracks: ITrack[] = []

  $refs!: {
    bodyContent: HTMLInputElement
  }

  get tracks() {
    return tracks.tracks.map((track) => {
      return { ...track, durationHms: secondsToHms(track.duration) }
    })
  }
  get loading() {
    return tracks.loading
  }

  deleteTrack(id: string) {
    tracks.deleteTrack(id)
  }

  openAddTrackModal() {
    modals.open('add-track')
  }

  async created() {
    await tracks.update()
  }

  @Watch('tracks')
  onTrackChanged(value: ITrack[]){
    this.sortedTracks = value
  }

  @Watch('loading')
  onLoadingChanged(value: boolean){
    if (value) {
      tableLoader = $vs.loading({
        target: this.$refs.bodyContent,
        type: 'scale',
      })
    } else if (tableLoader) {
      tableLoader.close()
      tableLoader = undefined
    }
  }
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
}
.title {
  margin: 10px;
}
.table_body_loader {
  position: absolute;
  width: 100%;
  height: 100px;
  z-index: -1;
}
</style>
