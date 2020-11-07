<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="collectionName" :to="`/${collection}`" />
        <q-breadcrumbs-el label="Record" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>

      <q-btn flat rounded icon="add" color="secondary" label="New" :to="`${collection}/create`" />
      <q-btn flat round dense icon="more_vert">
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
      </q-btn>
    </q-toolbar>
    <DataTable
      :columns="columns"
      :fetch="fetch"
      :destroy="destroy"
      :collection="collection"
      :params="params"
      :stateForm="stateForm"
    >
      <template v-slot:body-cell-file="props">
        <q-td :props="props">
          Title: {{props.row.title}} <br>
          Description: {{props.row.description}} <br>
        </q-td>
      </template>

      <template v-slot:body-cell-information="props">
        <q-td :props="props">
          Size: {{Math.round(props.row.size / 1000)}} KB <br>
        </q-td>
      </template>

      <template v-slot:body-cell-download="props">
        <q-td :props="props">
          <q-btn flat round icon="cloud_download" @click="redirectToDownload(props.row)" />
        </q-td>
      </template>
    </DataTable>

  </q-page>
</template>

<script>
import DataTable from 'components/resources/DataTable'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    DataTable
  },
  data () {
    const { collection } = this.$route.params
    return {
      collection,
      stateForm: 'entries', // entries, trash
      openPopup: false,
      imgUrl: null
    }
  },
  mounted () {
    if (Array.isArray(this.$router.prevRouteStack)) {
      this.$router.prevRouteStack.splice(0)
    }
  },
  watch: {
    $route (to, from) {
      const { collection } = to.params
      this.collection = collection
    }
  },
  methods: {
    ...mapActions({
      fetch (dispatch, payload) {
        return dispatch(this.collection + '/fetch', payload)
      },
      destroy (dispatch, payload) {
        return dispatch(this.collection + '/destroy', payload)
      }
    }),
    redirectToDownload (item) {
      const link = item.fullpath
      window.open(link, '_blank')
    }
  },
  computed: {
    // ...mapGetters({columns: 'countries/columns'}),
    ...mapState({
      columns (state, getters) {
        return getters[`${this.collection}/columns`]
      },
      params (state, getters) {
        return getters[`${this.collection}/params`]
      }
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
