import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { ITrack } from '~/../interfaces/ITrack'
import { player } from '~/store/index'

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

  @Mutation
  stop() {
    this.playlist = []
    this.trackIndex = -1
    this.timestamp = 0
    this.paused = true
  }

  @Mutation
  loadPlaylist({ tracks, index = 0 }: { tracks: ITrack[]; index: number }) {
    this.playlist = tracks
    this.trackIndex = index
    this.timestamp = 0
    this.paused = false
  }

  @Mutation
  setTime(time: number) {
    this.timestamp = time
  }

  @Mutation
  setVolume(volume: number) {
    if (volume < 0 || volume > 1) return
    this.volume = volume
  }

  @Mutation
  toggleMute() {
    this.muted = !this.muted
  }

  @Mutation
  nextTrack() {
    if (!player.existNextTrack) return (this.paused = true)
    if (this.trackIndex === this.playlist.length - 1 && this.isRepeat)
      return (this.trackIndex = 0)
    return this.trackIndex++
  }

  @Mutation
  prevTrack() {
    if (!player.existPrevTrack) return
    if (this.trackIndex === 0) return (this.timestamp = 0)
    return this.trackIndex--
  }

  @Mutation
  play() {
    this.paused = false
  }

  @Mutation
  pause() {
    this.paused = true
  }

  @Mutation
  setLoading(loading: boolean) {
    this.loading = loading
  }

  @Mutation
  toggleRepeat() {
    this.isRepeat = !this.isRepeat
  }

  @Mutation
  setTrackIndex(index: number) {
    this.trackIndex = index
  }
}
