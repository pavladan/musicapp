<template>
  <nuxt-link :to="to">
    <div :class="`tabs__item ${active ? 'active' : ''}`">
      <slot />
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Tab extends Vue {
  @Prop() readonly active!: boolean
  @Prop() readonly to!: string
}
</script>

<style scoped lang="scss">
.tabs__item {
  cursor: pointer;
  transition: var(--transition);
  border-bottom: 3px solid transparent;
  padding: 5px 50px;
  &:hover {
    color: rgb(var(--vs-primary));
  }
  &.active {
    border-bottom: 2px solid rgb(var(--vs-primary));
    transform: translateY(-3px);
    font-weight: 400;
  }
}
</style>
