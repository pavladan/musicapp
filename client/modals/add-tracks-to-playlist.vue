<template>
  <vs-dialog v-model="isOpen" blur class="add-track-to-playlist-modal">
    <template #header>
      <h4 class="not-margin">Add tracks</h4>
    </template>
    <div class="content">
      <track-list
        :tracks="[...tracks.tracks]"
        v-if="!tracks.loading"
        :selected="selectedTracks"
        :on-change-selected="onChangeSelectedTracks"
      />
      <loader v-else />
    </div>
    <template #footer>
      <div class="footer">
        <vs-button
          block
          :disabled="selectedTracks.length === 0"
          @click="handleAdd()"
          :loading='playlists.loading.tracks'
          >Add
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script lang="ts">
import { modals, playlists, tracks } from '@/store'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import TrackList from '~/components/trackList.vue'
import Loader from '~/components/loader.vue'

@Component({
  components: { Loader, TrackList },
})
export default class AddTracksToPlaylistModal extends Vue {
  selectedTracks: string[] = []
  onChangeSelectedTracks(value: string[]) {
    this.selectedTracks = value
  }

  async handleAdd() {
    if (modals.modalData.playlistId && this.playlist) {
      await playlists.edit({
        id: modals.modalData.playlistId,
        partialPlaylist: {
          trackList: [
            ...this.playlist.trackList,
            ...this.selectedTracks.map(p=>({track: p, orderId: -1})),
          ],
        },
      })
    }
    modals.close()
    this.selectedTracks = []
  }
  get isOpen() {
    return modals.modalName === 'add-tracks-to-playlist'
  }
  set isOpen(val) {
    val || modals.close()
  }
  get tracks() {
    return tracks
  }

  get playlists(){
    return playlists
  }

  get playlist() {
    return playlists.playlists.find((p) => p.id === modals.modalData.playlistId)
  }

  @Watch('isOpen')
  onChangeIsOpen(value: boolean) {
    if (value) {
      tracks.update()
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  min-height: 100px;
}
</style>
