import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

type ModalName = '' | 'login' | 'add-track'

@Module({ name: 'modals', stateFactory: true, namespaced: true })
export default class ModalsModule extends VuexModule {
  modalName: ModalName = ''

  @Mutation
  open(modalName: ModalName) {
    this.modalName = modalName
  }
  @Mutation
  close() {
    this.modalName = ''
  }
}
