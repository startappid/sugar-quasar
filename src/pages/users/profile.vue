<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Users" :to="`/${collection}`" />
        <q-breadcrumbs-el label="Profile" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>
    <ProfileForm
      :collection="collection"
      :stateForm="stateForm"
      :id="userId"
    />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileForm from 'components/users/ProfileForm'
export default {
  components: {
    ProfileForm
  },
  data () {
    return {
      collection: 'users',
      stateForm: 'update', // create, update, show
      id: null
    }
  },
  mounted () {
  },
  methods: {
  },
  computed: {
    ...mapGetters({
      profile: 'auth/user'
    }),
    userId () {
      return this.profile.id
    },
    collectionName () {
      const words = this.collection.split('_')
      const titles = []
      for (const key in words) {
        const word = words[key]
        titles.push(word.charAt(0).toUpperCase() + word.slice(1))
      }
      return titles.join(' ')
    }
  }
}
</script>
