<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="collectionName" :to="`/${collection}`" />
        <q-breadcrumbs-el label="Trash" :to="`/${collection}/trash`" />
        <q-breadcrumbs-el label="Detail" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>
    <FormLayout
      :collection="collection"
      :stateForm="stateForm"
      :id="id"
    />
  </q-page>
</template>

<script>
import FormLayout from 'components/form/FormLayout'
export default {
  components: {
    FormLayout
  },
  data () {
    const { collection } = this.$route.params
    return {
      collection,
      stateForm: 'trashed', // create, update, show, trashed
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
