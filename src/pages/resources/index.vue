<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$route.params.collection" icon="home" :to="`/${$route.params.collection}`" />
        <q-breadcrumbs-el label="Record" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>

      <q-btn flat round dense icon="add" class="q-mr-sm" :to="`${$route.params.collection}/create`" />
      <q-btn flat round dense icon="filter_list" class="q-mr-sm" />
      <q-btn flat round dense icon="more_vert">
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list>
            <q-item clickable v-close-popup tabindex="0"  :to="`${$route.params.collection}/report`">
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
            <q-item clickable v-close-popup :to="`${$route.params.collection}/export`">
              <q-item-section avatar>
                <q-avatar icon="cloud_download" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Export</q-item-label>
                <q-item-label caption>Export Records</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup :to="`${$route.params.collection}/import`">
              <q-item-section avatar>
                <q-avatar icon="cloud_upload" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Import</q-item-label>
                <q-item-label caption>Import Records</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item clickable v-close-popup tabindex="0" :to="`${$route.params.collection}/trash`" >
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
      </q-btn>
    </q-toolbar>
    <DataTable
      v-bind:form="form"
    />
  </q-page>
</template>

<script>
import DataTable from 'components/resources/DataTable'
import { mapState } from 'vuex'

export default {
  components: {
    DataTable
  },
  data () {
    const collection = this.$route.params.collection
    return {
      collection
    }
  },
  mounted () {
  },
  created () {
  },
  computed: {
    // FIXME: Resources module scope
    ...mapState('resources', {
      // 'collection',
      form: state => state.form,
      validation: state => state.validation,
      data: state => state.data,
      table: state => state.table
    })
  }
}
</script>
