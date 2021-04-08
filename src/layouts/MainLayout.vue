<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-ml-md"
        />

        <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap">
          <img src="http://startapp.id/startapp-light.png" width="56" />
          <span class="q-ml-sm">Startapp</span>
        </q-toolbar-title>

        <q-space />

        <q-input class="GPL__toolbar-input" dense standout="bg-white text-dark" v-model="search" placeholder="Search">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>

        <q-btn v-if="$q.screen.gt.xs" flat dense no-wrap color="primary" icon="add" no-caps label="Create" class="q-ml-sm q-px-md">
          <q-menu anchor="top end" self="top end">
            <q-list class="text-grey-8" style="min-width: 100px">
              <q-item aria-hidden="true">
                <q-item-section class="text-uppercase text-grey-7" style="font-size: 0.7rem">Create New</q-item-section>
              </q-item>
              <q-item v-for="menu in createMenu" :key="menu.text" clickable v-close-popup aria-hidden="true">
                <q-item-section avatar>
                  <q-icon :name="menu.icon" />
                </q-item-section>
                <q-item-section>{{ menu.text }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn v-if="$q.screen.gt.xs" flat dense no-wrap color="primary" icon="cloud_upload" no-caps label="Upload" class="q-ml-sm q-px-md" />

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="text-grey-7" icon="apps">
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>

          <q-btn round flat to="/profile">
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Your Profile</q-tooltip>
          </q-btn>
          <q-btn flat round dense icon="more_vert">
            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
            >
              <q-list>
                <q-item-label header>Settings</q-item-label>
                <q-item clickable v-close-popup >
                  <q-item-section avatar>
                    <q-avatar icon="flag" color="primary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Language</q-item-label>
                    <q-item-label caption>English</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup >
                  <q-item-section avatar>
                    <q-avatar icon="more_horiz" color="primary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Settings</q-item-label>
                    <q-item-label caption>More settings</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset spaced />
                <q-item clickable v-close-popup tabindex="0" @click="logout">
                  <q-item-section avatar>
                    <q-avatar icon="exit_to_app" color="negative" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Log Out</q-item-label>
                    <q-item-label caption>Exit to app</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item class="GNL__drawer-item" v-ripple v-for="link in links1" :key="link.text" clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />

          <q-item class="GNL__drawer-item" v-ripple v-for="link in links2" :key="link.text" clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />

          <q-item-label header>Administrator</q-item-label>

          <q-expansion-item
            icon="people"
            label="Users Management"
            class="q-my-sm"
          >
            <q-item clickable v-ripple to="/users">
              <q-item-section>
                Users
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/roles">
              <q-item-section>
                Roles
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/permissions">
              <q-item-section>
                Permissions
              </q-item-section>
            </q-item>

          </q-expansion-item>

          <q-expansion-item
            icon="storage"
            label="Data Master"
            class="q-my-sm"
          >
            <q-item clickable v-ripple to="/contacts">
              <q-item-section>
                Contacts
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/addresses">
              <q-item-section>
                Addresses
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/files">
              <q-item-section>
                Files &amp; Media Manager
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item
            icon="flag"
            label="Countries"
            class="q-my-sm"
          >
            <q-item clickable v-ripple to="/countries">
              <q-item-section>
                Countries
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/provinces">
              <q-item-section>
                Provinces
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/cities">
              <q-item-section>
                Cities
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator inset class="q-my-sm" />

          <q-item class="GNL__drawer-item" v-ripple v-for="link in links3" :key="link.text" clickable>
            <q-item-section>
              <q-item-label>{{ link.text }} <q-icon v-if="link.icon" :name="link.icon" /></q-item-label>
            </q-item-section>
          </q-item>

          <div class="q-mt-md">
            <div class="flex flex-center q-gutter-xs">
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Privacy">Privacy</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Terms">Terms</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="About">About Google</a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: true,
      search: '',
      storage: 0.26,
      links1: [
        { icon: 'photo', text: 'Photos' },
        { icon: 'photo_album', text: 'Albums' },
        { icon: 'assistant', text: 'Assistant' },
        { icon: 'people', text: 'Sharing' },
        { icon: 'book', text: 'Photo books' }
      ],
      links2: [
        { icon: 'archive', text: 'Archive' },
        { icon: 'delete', text: 'Trash' }
      ],
      links3: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'help', text: 'Help & Feedback' },
        { icon: 'get_app', text: 'App Downloads' }
      ],
      createMenu: [
        { icon: 'photo_album', text: 'Album' },
        { icon: 'people', text: 'Shared Album' },
        { icon: 'movie', text: 'Movie' },
        { icon: 'library_books', text: 'Animation' },
        { icon: 'dashboard', text: 'Collage' },
        { icon: 'book', text: 'Photo book' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      profile: 'auth/user',
      loggedIn: 'auth/loggedIn'
    }),
    name () {
      return this.profile.first_name + ' ' + this.profile.last_name
    },
    username () {
      return this.profile.username
    }
  },
  methods: {
    logout () {
      this.$q.dialog({
        title: 'Logout',
        message: 'Are you sure to logout?',
        ok: {
          label: 'Logout',
          color: 'negative',
          flat: true
        },
        cancel: {
          label: 'Cancel',
          color: 'white',
          textColor: 'black',
          flat: true
        },
        persistent: true
      }).onOk(() => {
        this.$q.localStorage.clear()
        this.$q.sessionStorage.clear()
        this.$q.cookies.remove('authorization_token')
        this.$router.push('/login')
        this.$q.notify('You\'re logged out')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>

<style lang="sass">
.GPL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 35%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368
    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px
  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500
  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>
