import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import api from '~/utils/api'
import { ITrack, ITrackDTO } from '../../interfaces/ITrack'
import { $vs } from '~/plugins/vuesax'

@Module({ name: 'tracks', stateFactory: true, namespaced: true })
export default class TracksModule extends VuexModule {
  tracks: ITrack[] = []
  loading = false
  errorMessage = ''

  @Mutation
  request() {
    this.loading = true
    this.errorMessage = ''
  }

  @Mutation
  request_success(tracks: ITrack[]) {
    this.tracks = tracks
    this.loading = false
  }

  @Mutation
  request_error(err: string) {
    this.loading = false
    this.errorMessage = err
    $vs.notification({
      title: 'Error',
      text: err,
      progress: 'auto',
      color: 'danger',
    })
  }

  @Action
  async update() {
    this.request()
    try {
      const tracks = (await api.user.tracks()).tracks
      this.request_success(tracks)
    } catch (err) {
      this.request_error('Error Fetching Musics')
    }
  }

  @Action
  async deleteTrack(id: string) {
    this.request()
    try {
      await api.track.delete(id)
      this.request_success(this.tracks.filter((track) => track.id !== id))
    } catch (err) {
      this.request_error('Error Delete Track')
    }
  }

  @Action
  async addTracks(tracks: ITrackDTO[]) {
    this.request()
    try {
      const responses = await Promise.all(
        tracks.map((track) => {
          return api.track.add(track)
        })
      )
      this.request_success([
        ...responses.map((resp) => resp.track),
        ...this.tracks,
      ])
    } catch (err) {
      this.request_error('Track adding error')
    }
  }
}
