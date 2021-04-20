<template>
  <div class="loader" ref="loaderRef"></div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'nuxt-property-decorator'
import { $vs } from '~/plugins/vuesax'

let loader: any

@Component
export default class Loader extends Vue {
  @Ref() readonly loaderRef!: HTMLDivElement
  mounted() {
    loader = $vs.loading({
      target: this.loaderRef,
      type: 'scale',
      opacity: .2
    })
  }
  destroyed() {
    loader.close()
    loader = undefined
  }
}
</script>

<style scoped></style>
