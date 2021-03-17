<template>
  <div>
    <div class="item">
      <h2 class="title">Tracks</h2>
      <vs-button
        icon
        gradient
        circle
        @click="$store.commit('modals/open', 'add-track')"
      >
        <i class="bx bx-plus"></i>
      </vs-button>
    </div>
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th
            sort
            @click="allTracks = $vs.sortData($event, allTracks, 'id')"
          >
            #
          </vs-th>
          <vs-th
            sort
            @click="allTracks = $vs.sortData($event, allTracks, 'title')"
          >
            Title
          </vs-th>
          <vs-th
            sort
            @click="allTracks = $vs.sortData($event, allTracks, 'artist')"
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
          v-if="!musicLoading"
          :key="i"
          v-for="(tr, i) in $vs.getSearch(allTracks, search)"
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
              @click="deleteTrack(tr._id)"
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
import api from '@/utils/api'
import secondsToHms from '@/utils/secondsToHms'
let tableLoader

export default {
  components: { AddTrackModal },
  data: () => {
    return {
      search: '',
      musicLoading: false,
      allTracks: [],
    }
  },
  methods: {
    async getAllTracks() {
      this.musicLoading = true
      try {
        this.allTracks = (await api.user.tracks()).tracks
        this.allTracks.forEach((track) => {
          track.durationHms = secondsToHms(track.duration)
        })
        this.musicLoading = false
      } catch (err) {
        this.musicLoading = false
        this.$vs.notification({
          title: 'Error',
          text: 'Error Fetching Musics',
          progress: 'auto',
          color: 'danger',
        })
      }
    },
    async deleteTrack(id) {
      this.musicLoading = true
      try {
        await api.track.delete(id)
        this.musicLoading = false
        await this.getAllTracks()
      } catch (err) {
        this.musicLoading = false
        this.$vs.notification({
          title: 'Error',
          text: 'Error Delete Track',
          progress: 'auto',
          color: 'danger',
        })
      }
    },
  },
  created() {
    this.getAllTracks()
  },
  watch: {
    musicLoading: function (value) {
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
