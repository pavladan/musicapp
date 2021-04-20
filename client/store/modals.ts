import { Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'

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
  @VuexMutation
  close() {
    this.modalName = ''
    this.modalData = {}
  }
}
