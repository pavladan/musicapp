<template>
<div class='tabs'>
  <slot/>
</div>
</template>

<script lang='ts'>

import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Tabs extends Vue{
}
</script>

<style scoped lang='scss'>
  .tabs{
    display: flex;
    gap: 20px;
    margin:20px 10px 10px;
  }
</style>
