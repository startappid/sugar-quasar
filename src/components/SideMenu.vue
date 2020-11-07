<template>
  <q-list>

    <q-item clickable v-ripple to="/">
      <q-item-section avatar>
        <q-icon name="dashboard" />
      </q-item-section>
      <q-item-section>
        Dashboard
      </q-item-section>
    </q-item>

    <q-item-label header>Quasar</q-item-label>


    <q-separator inset />

    <q-item-label header>Administrator</q-item-label>

    <q-expansion-item
      icon="people"
      label="Users"
      caption="Users Management"
      class="q-my-sm"
    >
      <q-item clickable v-ripple :inset-level="1" to="/users">
        <q-item-section avatar>
          <q-icon name="people" />
        </q-item-section>
        <q-item-section>
          Users
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :inset-level="1" to="/roles">
        <q-item-section avatar>
          <q-icon name="assignment_ind" />
        </q-item-section>
        <q-item-section>
          Roles
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :inset-level="1" to="/permissions">
        <q-item-section avatar>
          <q-icon name="lock" />
        </q-item-section>
        <q-item-section>
          Permissions
        </q-item-section>
      </q-item>

    </q-expansion-item>

    <q-expansion-item
      icon="storage"
      label="Data Master"
      caption="Data Master"
      class="q-my-sm"
    >
      <q-item clickable v-ripple :inset-level="1" to="/contacts">
        <q-item-section avatar>
          <q-icon name="contacts" />
        </q-item-section>
        <q-item-section>
          Contacts
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :inset-level="1" to="/addresses">
        <q-item-section avatar>
          <q-icon name="person_pin" />
        </q-item-section>
        <q-item-section>
          Addresses
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :inset-level="1" to="/images">
        <q-item-section avatar>
          <q-icon name="image_search" />
        </q-item-section>
        <q-item-section>
          Image Gallery
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :inset-level="1" to="/files">
        <q-item-section avatar>
          <q-icon name="folder" />
        </q-item-section>
        <q-item-section>
          Files Manager
        </q-item-section>
      </q-item>
    </q-expansion-item>

    <q-expansion-item
      icon="flag"
      label="Countries"
      caption="Countries data"
      class="q-my-sm"
    >
      <q-item clickable v-ripple :inset-level="1" to="/countries">
        <q-item-section avatar>
          <q-icon name="flag" />
        </q-item-section>
        <q-item-section>
          Countries
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :inset-level="1" to="/provinces">
        <q-item-section avatar>
          <q-icon name="apartment" />
        </q-item-section>
        <q-item-section>
          Provinces
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :inset-level="1" to="/cities">
        <q-item-section avatar>
          <q-icon name="location_city" />
        </q-item-section>
        <q-item-section>
          Cities
        </q-item-section>
      </q-item>
    </q-expansion-item>
    <!-- <q-separator />
    <div class="q-my-md">
      <q-item-label header>Message</q-item-label>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="inbox" />
        </q-item-section>

        <q-item-section>
          Inbox
        </q-item-section>
      </q-item>

      <q-item active clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="star_outline" />
        </q-item-section>

        <q-item-section>
          Star
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="send" />
        </q-item-section>

        <q-item-section>
          Send
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="drafts" />
        </q-item-section>

        <q-item-section>
          Drafts
        </q-item-section>
      </q-item>
    </div> -->

    <!-- <q-separator />

    <div class="q-my-md">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          Settings
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="feedback" />
        </q-item-section>
        <q-item-section>
          Send Feedback
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="help_outline" />
        </q-item-section>
        <q-item-section>
          Help
        </q-item-section>
      </q-item>
    </div> -->

  </q-list>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideMenu',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      roles: 'auth/roles'
    })
  },
  methods: {
    permissions (page) {
      const roles = this.roles
      // Driver Management -- Ijin Luar Kota, Pesan
      // finance -- Outstanding, Pesan
      // Commercial -- Iklan, Menjawab Pertanyaan, Pesan
      // Fleet -- Isi Kebijakan Maintenance , Jawab Pertanyaan, Pesan
      // Quality Management -- Isi Kebijakan Non-Maintenance , Jawab Pertanyaan, Pesan
      // Driver Onboarding -- Approve Registrasi, Pesan
      const permits = {
        users: ['superadmin', 'admin', 'Driver Onboarding'],
        drivers: ['superadmin', 'admin'],
        ads: ['superadmin', 'admin', 'Commercial'],
        outstandings: ['superadmin', 'admin', 'finance'],
        maintenances: ['superadmin', 'admin', 'Fleet'],
        driver_permissions: ['superadmin', 'admin', 'Driver Management'],
        notifications: ['superadmin', 'admin', 'finance', 'Driver Management', 'Commercial', 'Fleet', 'Quality Management', 'Driver Onboarding'],
        questions: ['superadmin', 'admin', 'Commercial', 'Fleet', 'Quality Management'],
        faq: ['superadmin', 'admin'],
        terms: ['superadmin', 'admin', 'Quality Management']
      }

      const permissions = permits[page]
      if (permissions) {
        const intersection = permissions.filter(x => roles.includes(x))
        if (intersection.length) return true
        return false
      }
      return false
    }
  }
}
</script>
