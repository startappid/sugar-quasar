<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="collectionName" icon="home" :to="`/${collection}`" />
        <q-breadcrumbs-el label="Create" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>
    <UsersForm
      :collection="collection"
      :stateForm="stateForm"
    />
  </q-page>
</template>

<script>
import UsersForm from 'components/users/UsersForm'
export default {
  components: {
    UsersForm
  },
  data () {
    return {
      collection: 'users',
      stateForm: 'create' // create, update, show
    }
  },
  methods: {
  },
  computed: {
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
