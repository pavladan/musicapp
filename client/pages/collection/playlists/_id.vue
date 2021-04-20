<template>
  <div class="playlist">
    <loader v-if="playlists.loading.all" />
    <div class="playlist-header">
      <div class="playlist-cover">
        <loader v-if="playlists.loading.cover" />
        <playlist-cover :img="cover" />
        <vs-button
          :class="`playlist-cover-upload ${!cover ? 'static' : ''}`"
          shadow
          block
        >
          {{ (cover ? 'Change' : ' Add') + ' cover' }}
          <input
            class="playlist-cover-upload-input"
            type="file"
            accept="image/*"
            @change="uploadImage($event.target.files)"
          />
        </vs-button>
      </div>
      <div class="playlist-info">
        <h6>Playlist</h6>
        <vs-input
          :value="title"
          @change="onChangeTitle($event)"
          :loading="playlists.loading.title"
          class="playlist-info-title"
          icon-after
        >
          <template #icon>
            <i class="bx bx-edit-alt" />
          </template>
        </vs-input>
        <div class="playlist-info-actions">
          <vs-button
            icon
            @click="
              modals.open({
                name: 'add-tracks-to-playlist',
                data: { playlistId },
              })
            "
          >
            <i class="bx bx-plus" />
            Add tracks to playlist
          </vs-button>
        </div>
      </div>
    </div>
    <div class="playlist-body">
      <loader v-if="playlists.loading.tracks" />
      <track-list
        :tracks="playlist && playlist.trackList.map((p) => p.track)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import PlaylistCover from '~/components/playlistCover.vue'
import { playlists, modals } from '~/store'
import { Context } from '@nuxt/types'
import Loader from '~/components/loader.vue'
import TrackList from '~/components/trackList.vue'

let loader: any

@Component({
  components: { TrackList, Loader, PlaylistCover },
})
export default class Playlist extends Vue {
  playlistId: string = ''
  title = ''

  async uploadImage(files: File[]) {
    await playlists.edit({
      id: this.playlistId,
      partialPlaylist: {
        cover: files[0],
      },
    })
  }

  onChangeTitle(event: Event) {
    const target = event.currentTarget as HTMLInputElement
    this.title = target.value
    this.playlists.edit({
      id: this.playlistId,
      partialPlaylist: {
        title: target.value,
      },
    })
  }

  get playlists() {
    return playlists
  }

  get playlist() {
    return playlists.playlists.find((p) => p.id === this.playlistId)
  }

  get modals() {
    return modals
  }

  get cover() {
    return this.playlist?.cover?.url
  }

  async asyncData(context: Context) {
    const id = context.params.id
    return { playlistId: id }
  }

  async created() {
    await playlists.getById(this.playlistId)
  }

  @Watch('playlist.title', { immediate: true })
  onChangePlaylistTitle(value: string) {
    this.title = value
  }
}
</script>

<style scoped lang="scss">
.playlist {
  position: relative;
  &-header {
    display: flex;
  }
  &-cover {
    width: 200px;
    min-width: 200px;
    height: 200px;
    position: relative;
    border-radius: var(--vs-radius);
    overflow: hidden;
    &:hover {
      .playlist-cover-upload {
        opacity: 1;
      }
    }
    &-upload {
      position: absolute;
      cursor: pointer;
      bottom: 5%;
      left: 50%;
      width: 90%;
      transform: translateX(-50%);
      margin: 0;
      opacity: 0;
      transition: var(--transition);
      &.static {
        opacity: 1;
      }
      &-input {
        display: block;
        opacity: 0;
        position: absolute;
        left: 0;
        width: 100%;
        top: 0;
        height: 100%;
        cursor: pointer;
      }
    }
  }
  &-info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    &-title {
    }
    &-actions {
      flex: 1 1 1px;
      display: flex;
      align-items: flex-end;
    }
  }
  &-body {
    margin-top: 20px;
    position: relative;
  }
}
</style>

<style lang="scss">
.playlist-info {
  &-title {
    input {
      font-size: 30px;
      width: 100%;
      &:not(:focus) {
        background: rgba(0, 0, 0, 0);
      }
    }
  }
}
</style>
