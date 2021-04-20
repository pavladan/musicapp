<template>
  <div class="playlists">
    <loader v-if='playlists.loading.all'/>
    <vs-card
      v-for="playlist in playlists.playlists"
      :key="playlist.id"
      class="playlists__item"
      @click="$router.push(`playlists/${playlist.id}`)"
      type="4"
    >
      <template #img>
        <div class="playlists__item-other">
          <vs-tooltip
            interactivity
            bottom
            dark
            not-hover
            v-model="playlistPopupFromId(playlist.id).active"
          >
            <vs-button
              icon
              circle
              transparent
              color="var(--vs-text)"
              @click.stop="
                playlistPopupFromId(playlist.id).active = !playlistPopupFromId(
                  playlist.id
                ).active
              "
            >
              <i class="bx bx-dots-vertical-rounded" />
            </vs-button>
            <template #tooltip>
              <div class="other-content">
                <vs-button
                  icon
                  transparent
                  flat
                  danger
                  @click="deletePlaylist(playlist.id)"
                >
                  <i class="bx bx-trash" />
                  Delete
                </vs-button>
              </div>
            </template>
          </vs-tooltip>
        </div>
        <playlist-cover
          class="playlists__item-cover"
          :img="playlist.cover && playlist.cover.url"
        />
      </template>
      <template #text>{{ playlist.title }}</template>
    </vs-card>
    <vs-card @click="addPlaylist" class="playlists__item" type="4">
      <template #img>
        <div class="add-playlist-button playlists__item-cover">
          <i class="bx bx-plus" />
        </div>
      </template>
      <template #text></template>
    </vs-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { playlists } from '~/store'
import PlaylistCover from '~/components/playlistCover.vue'
import { IPlaylist } from '../../../../interfaces/IPlaylist'
import Loader from '~/components/loader.vue'

let loader: any
@Component({
  components: { Loader, PlaylistCover },
})
export default class Playlists extends Vue {
  playlistPopupsActive: { id: string; active: boolean }[] = []

  async addPlaylist() {
    const newPlaylist = await playlists.add()
    newPlaylist && (await this.$router.push(`playlists/${newPlaylist.id}`))
  }

  get playlists() {
    return playlists
  }

  playlistPopupFromId(id: string) {
    return this.playlistPopupsActive.find((p) => p.id === id) || {active:false}
  }

  async deletePlaylist(id: string) {
    this.playlistPopupFromId(id).active = false
    await playlists.delete(id)
  }
  created() {
    playlists.get()
  }
  @Watch('playlists.playlists', { immediate: true })
  onPlaylistsChanged(value: IPlaylist[]) {
    if (value) {
      this.playlistPopupsActive = value.map((p) => ({
        id: p.id,
        active: false,
      }))
    }
  }
}
</script>

<style scoped lang="scss">
.playlists {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  position: relative;
  &__item {
    &-cover {
      height: 300px;
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 50px;
      background: rgb(var(--vs-gray-1));
    }
    &-other {
      z-index: 1;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
}
</style>
