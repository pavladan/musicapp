import { ITrack } from '~/../interfaces/ITrack'
import { player } from '~/store/index'
import { Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'

@Module({ name: 'player', stateFactory: true, namespaced: true })
export default class PlayerModule extends VuexModule {
  playlist: ITrack[] = []
  paused = true
  muted = false
  volume = 0.5
  timestamp = 0
  trackIndex = -1
  isRepeat = false
  loading = false

  get hasPlaylist() {
    return this.playlist.length > 0
  }
  get currentTrack(): ITrack | undefined {
    return this.playlist[this.trackIndex]
  }
  get existNextTrack() {
    if (this.trackIndex === this.playlist.length - 1) {
      return this.isRepeat
    }
    return true
  }
  get existPrevTrack() {
    return true
  }

  @VuexMutation
  stop() {
    this.playlist = []
    this.trackIndex = -1
    this.timestamp = 0
    this.paused = true
  }

  @VuexMutation
  loadPlaylist({ tracks, index = 0 }: { tracks: ITrack[]; index: number }) {
    this.playlist = tracks
    this.trackIndex = index
    this.timestamp = 0
    this.paused = false
  }

  @VuexMutation
  setTime(time: number) {
    this.timestamp = time
  }

  @VuexMutation
  setVolume(volume: number) {
    if (volume < 0 || volume > 1) return
    this.volume = volume
  }

  @VuexMutation
  toggleMute() {
    this.muted = !this.muted
  }

  @VuexMutation
  nextTrack() {
    if (!player.existNextTrack) return (this.paused = true)
    if (this.trackIndex === this.playlist.length - 1 && this.isRepeat)
      return (this.trackIndex = 0)
    return this.trackIndex++
  }

  @VuexMutation
  prevTrack() {
    if (!player.existPrevTrack) return
    if (this.trackIndex === 0) return (this.timestamp = 0)
    return this.trackIndex--
  }

  @VuexMutation
  play() {
    this.paused = false
  }

  @VuexMutation
  pause() {
    this.paused = true
  }

  @VuexMutation
  setLoading(loading: boolean) {
    this.loading = loading
  }

  @VuexMutation
  toggleRepeat() {
    this.isRepeat = !this.isRepeat
  }

  @VuexMutation
  setTrackIndex(index: number) {
    this.trackIndex = index
  }
}
