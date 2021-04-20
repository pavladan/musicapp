<template>
  <div>
    <tabs>
      <tab to='/collection/tracks'  :active="$route.path.includes('/collection/tracks')">Tracks</tab>
      <tab to='/collection/playlists' :active="$route.path.includes('/collection/playlists')">Playlists</tab>
    </tabs>
    <NuxtChild />
  </div>
</template>

<script lang='ts'>

import Tabs from '~/components/tabs/tabs.vue'
import Tab from '~/components/tabs/tab.vue'
export default {
  components: { Tab, Tabs },
}
</script>
