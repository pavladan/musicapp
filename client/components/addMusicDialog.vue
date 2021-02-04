<template>
  <vs-dialog v-model="isOpen">
  </vs-dialog>
</template>

<script>
export default {
  name: 'add-music-dialog',
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
        return this.value;
      },
      set(val) {
        this.$emit('event', val)
      }
    },
  },
}
</script>

<style scoped></style>
