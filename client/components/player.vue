<template>
  <div :class="`player ${!player.hasPlaylist ? 'hide' : ''} ${!player.paused ? 'playing' : ''}`">
    <div class="progress" @click="seek($event)">
      <div class="progress-bar">
        <div
          class="progress-bar-complete"
          :style="{
            transform: `scaleX(${
              player.currentTrack
                ? player.timestamp / player.currentTrack.duration
                : 0
            })`,
          }"
        ></div>
      </div>
    </div>
    <audio ref="audio" />
    <div class="controls">
      <vs-button-group>
        <vs-button
          relief
          icon
          :disabled="!player.existPrevTrack"
          @click="player.prevTrack()"
        >
          <i class="bx bx-skip-previous" />
        </vs-button>
        <vs-button
          relief
          icon
          @click="player.paused ? player.play() : player.pause()"
        >
          <i class="bx bx-play" v-if="player.paused" />
          <i class="bx bx-pause" v-else />
        </vs-button>
        <vs-button
          relief
          icon
          :disabled="!player.existNextTrack"
          @click="player.nextTrack()"
        >
          <i class="bx bx-skip-next" />
        </vs-button>
      </vs-button-group>
      <!--      <vs-button relief icon>-->
      <!--        <i class="bx bx-shuffle" />-->
      <!--      </vs-button>-->
      <vs-button
        relief
        icon
        :active="player.isRepeat"
        @click="player.toggleRepeat()"
      >
        <i class="bx bx-repeat" />
      </vs-button>
      <vs-button relief icon @click="player.toggleMute()">
        <i class="bx bx-volume-mute" v-if="player.muted" />
        <i class="bx bx-volume-low" v-else />
      </vs-button>
    </div>
    <div class="track-info">
      <div class="cover">
        <empty-cover />
      </div>
      <div class="cred" v-if='!!player.currentTrack'>
        <div class="title">{{ player.currentTrack.title }}</div>
        <div class="artist">{{ player.currentTrack.artist}}</div>
      </div>
    </div>

    <div class='controls'>
      <vs-button relief icon  @click='openPlaylist=true'>
        <i class="bx bx-menu" />
      </vs-button>
    </div>
    <playlist-sidebar v-model='openPlaylist' />
  </div>

</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import { player } from '~/store'
import { ITrack } from '../../interfaces/ITrack'
import PlaylistSidebar from '~/components/playlistSidebar.vue'
import EmptyCover from '~/components/emptyCover.vue'
@Component({
  components: { EmptyCover, PlaylistSidebar }
})
export default class Player extends Vue {
  openPlaylist=false
  @Ref() readonly audio!: HTMLAudioElement


  mounted() {
    this.audio.addEventListener('loadstart', () => {
      player.setLoading(true)
    })
    this.audio.addEventListener('canplay', () => {
      player.setLoading(false)
    })
    this.audio.addEventListener('timeupdate', (e) => {
      const target = e.currentTarget as HTMLAudioElement
      player.setTime(target.currentTime)
    })
    this.audio.addEventListener('ended', () => {
      player.nextTrack()
    })
  }
  get player() {
    return player
  }

  seek(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement
    this.audio.currentTime =
      (event.offsetX / target.offsetWidth) * this.audio.duration
  }

  @Watch('player.currentTrack')
  onChangeTrackId(val: ITrack) {
    this.audio.src = val?.mediaUrl
    this.audio.load()
    if (player.paused) this.audio.pause()
    else this.audio.play()
  }

  @Watch('player.paused')
  onChangePause(val: boolean) {
    if (val) return this.audio.pause()
    return this.audio.play()
  }

  @Watch('player.muted')
  onChangeMuted(val: boolean) {
    this.audio.muted = val
  }
}
</script>

<style scoped lang="scss">
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgb(var(--vs-gray-2));
  display: flex;
  z-index: var(--vs-zindex-1);
  transition: var(--transition);
  &.hide {
    transform: translateY(100%);
    visibility: hidden;
  }
  &.playing{
    .track-info .cover{
      animation: rotate-center 5s linear infinite both;
    }
  }
  .progress {
    position: absolute;
    height: 18px;
    bottom: 100%;
    left: 0;
    width: 100%;
    padding-top: 5px;
    cursor: pointer;
    &-bar {
      background: rgb(var(--vs-gray-1));
      width: 100%;
      height: 100%;
      position: relative;
      &-complete {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(var(--vs-primary));
        z-index: 1;
        transform-origin: 0;
        pointer-events: none;
        transition: var(--transition);
      }
    }
  }

  .controls {
    display: flex;
    padding: 10px 20px;
  }
  .track-info {
    display: flex;
    align-items: center;
  flex: 1;

    .cred {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      .title{
        font-weight: 500;
      }
      .artist{
        font-size: .8em;
      }
    }
  }
}

@keyframes rotate-center {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
