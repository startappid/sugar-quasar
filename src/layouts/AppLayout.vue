<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background: rgb(1, 119, 102);">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          GoFleet
        </q-toolbar-title>
        <MenuHeaderTopbar/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-white shadow-1"
      :breakpoint="400"
    >
      <MenuHeaderProfile/>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <SideMenu/>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SideMenu from 'components/SideMenu'
import MenuHeaderProfile from 'components/MenuHeaderProfile'
import MenuHeaderTopbar from 'components/MenuHeaderTopbar'

export default {
  name: 'AppLayout',
  components: {
    SideMenu,
    MenuHeaderProfile,
    MenuHeaderTopbar
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
