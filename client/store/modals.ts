import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

type ModalName = '' | 'login' | 'add-track' | 'add-tracks-to-playlist'

interface OpenModal<T> {
  name: T
  data?: T extends 'add-tracks-to-playlist'
    ? {
        playlistId: string
      }
    : never
}
@Module({ name: 'modals', stateFactory: true, namespaced: true })
export default class ModalsModule extends VuexModule {
  modalName: ModalName = ''
  modalData: { playlistId?: string } = {}

  @VuexMutation
  open({ name, data }: OpenModal<ModalName>) {
    this.modalName = name
    if (data) {
      this.modalData = data
    }
  }
  @Mutation
  close() {
    this.modalName = ''
    this.modalData = {}
  }
}
