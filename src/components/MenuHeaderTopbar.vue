<template>
  <div>
    <div v-if="!loggedIn">
      <q-btn flat round dense icon="Login" class="q-mr-sm"/>
    </div>
    <div v-if="loggedIn">
      <!-- <q-btn flat round dense icon="notifications" class="q-mr-sm"/> -->
      <q-btn flat round dense icon="more_vert">
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list>
            <q-item clickable v-close-popup tabindex="0" to="/user/profile">
              <q-item-section avatar>
                <q-avatar icon="face" color="secondary" text-color="grey-11" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{username}}</q-item-label>
                <q-item-label caption>Your profile</q-item-label>
              </q-item-section>
            </q-item>
            <!-- <q-separator inset spaced />
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
            </q-item> -->
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MenuHeaderTopbar',
  data () {
    return {
      user: null
    }
  },
  mounted () {

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
