<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="collectionName" icon="home" :to="`/${collection}`" />
        <q-breadcrumbs-el label="Record" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>

      <q-btn flat rounded icon="add" color="secondary" label="New" :to="`${collection}/create`" />
      <q-btn flat rounded icon="delete" color="negative" label="Trash" :to="`${collection}/trash`" />
      <!-- <q-btn flat round dense icon="more_vert">
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list>
            <q-item clickable v-close-popup tabindex="0"  :to="`${collection}/report`">
              <q-item-section avatar>
                <q-avatar icon="bar_chart" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Report</q-item-label>
                <q-item-label caption>Report Records</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item-label header>Import &amp; Export</q-item-label>
            <q-item clickable v-close-popup :to="`${collection}/export`">
              <q-item-section avatar>
                <q-avatar icon="cloud_download" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Export</q-item-label>
                <q-item-label caption>Export Records</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup :to="`${collection}/import`">
              <q-item-section avatar>
                <q-avatar icon="cloud_upload" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Import</q-item-label>
                <q-item-label caption>Import Records</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item clickable v-close-popup tabindex="0" :to="`${collection}/trash`" >
              <q-item-section avatar>
                <q-avatar icon="delete" color="negative" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Trash</q-item-label>
                <q-item-label caption>Records Deleted</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn> -->
    </q-toolbar>
    <DataTable
      :columns="columns"
      :fetch="fetch"
      :destroy="destroy"
      :collection="collection"
    />
  </q-page>
</template>

<script>
import DataTable from 'components/resources/DataTable'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DataTable
  },
  data () {
    return {
      collection: 'countries'
    }
  },
  methods: {
    ...mapActions('countries', ['fetch', 'destroy'])
  },
  computed: {
    ...mapGetters({
      columns: 'countries/columns'
    }),
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
