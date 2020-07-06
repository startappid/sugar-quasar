<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="collectionName" icon="home" :to="`/${collection}`" />
        <q-breadcrumbs-el label="Trash" :to="`/${collection}/trash`" />
        <q-breadcrumbs-el label="Detail" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>
    <RolesFormTrashed
      :collection="collection"
      :stateForm="stateForm"
      :id="id"
    />
  </q-page>
</template>

<script>
import RolesFormTrashed from 'components/roles/RolesFormTrashed'
export default {
  components: {
    RolesFormTrashed
  },
  data () {
    return {
      collection: 'roles',
      stateForm: 'show', // create, update, show
      id: this.$route.params.id
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
