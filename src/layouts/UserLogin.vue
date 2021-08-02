<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container class="bg-gradient-den">
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style scoped>
.bg-gradient-den {
  background: rgb(1,80,152);
  background: linear-gradient(180deg, rgba(1,80,152,1) 72%, rgba(108,125,240,1) 100%);
}
</style>
<script>
import { ref } from 'vue'

export default {
  name: 'UserLogin',
  setup () {
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
