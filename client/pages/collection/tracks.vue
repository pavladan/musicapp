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
          :key="i"
          v-for="(tr, i) in sortedTracks"
          :data="tr"
        >
          <vs-td>
            {{ i + 1 }}
          </vs-td>
          <vs-td>
            {{ tr.title }}
          </vs-td>
          <vs-td>
            {{ tr.artist }}
          </vs-td>
          <vs-td>
            <vs-button
              icon
              danger
              transparent
              circle
              @click="deleteTrack(tr.id)"
              size="small"
            >
              <i class="bx bxs-trash"></i>
            </vs-button>
          </vs-td>
          <vs-td>
            {{ tr.durationHms }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <add-track-modal />
  </div>
</template>

<script>
import AddTrackModal from '@/modals/add-track'
import secondsToHms from '@/utils/secondsToHms'
import { modals, tracks } from '@/store'
let tableLoader

export default {
  components: { AddTrackModal },
  data: () => {
    return {
      sortedTracks: [],
    }
  },
  computed: {
    tracks: () =>
      tracks.tracks.map((track) => {
        return { ...track, durationHms: secondsToHms(track.duration) }
      }),
    loading: () => tracks.loading,
  },
  methods: {
    deleteTrack: id=>tracks.deleteTrack(id),
    openAddTrackModal: () => modals.open('add-track'),
  },
  async created() {
      await tracks.update()
  },
  watch: {
    tracks(value){
      this.sortedTracks = value
    },
    loading: function (value) {
      if (value) {
        tableLoader = this.$vs.loading({
          target: this.$refs.bodyContent,
          type: 'scale',
        })
      } else if (tableLoader) {
        tableLoader.close()
        tableLoader = undefined
      }
    },
  },
  middleware: ['authenticated'],
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
