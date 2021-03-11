<template>
  <vs-dialog v-model="isOpen"> </vs-dialog>
</template>

<script>
import { modals } from '@/store'

export default {
  name: 'add-track-modal',
  model: {
    prop: 'value',
    event: 'event',
  },

  props: {
    value: Boolean,
  },
  computed: {
    isOpen: {
      get() {
        return modals.modalName === 'add-track'
      },
      set(val) {
        val || modals.close()
      },
    },
  },
}
</script>

<style scoped></style>
