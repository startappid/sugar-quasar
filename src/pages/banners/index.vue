<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$t(`${storeCollection}.index.title`)" :to="`/${storeCollection}`" />
        <q-breadcrumbs-el label="Record" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>

      <q-btn flat rounded icon="delete" color="negative" label="Trash" :to="`/${storeCollection}/trash`" />
      <q-btn rounded icon="add" color="secondary" class="q-ml-sm" label="New" :to="`/${storeCollection}/create`" />
    </q-toolbar>
    <DataTable
      :columns="columns"
      :fetch="fetch"
      :destroy="destroy"
      :collection="storeCollection"
      :params="params"
      :stateForm="stateForm"
    >
      <template v-slot:body-cell-title="props">
        <q-td :props="props" auto-width @click.stop.prevent class="q-mx-none q-px-none">
          <q-avatar rounded class="q-mx-none q-px-none">
            <!-- <img :src="props.row.thumbnail.fullpath" /> -->
            <q-icon name="videocam" v-if="props.row.type=='video'" />
            <q-icon name="image" v-else />
          </q-avatar>
          {{props.row.title}}
        </q-td>
      </template>
    </DataTable>
  </q-page>
</template>

<script>
import DataTable from 'components/resources/DataTable'
import { mapState, mapActions } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    DataTable
  },
  props: {
    collection: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      stateForm: 'entries' // entries, trash
    }
  },
  methods: {
    ...mapActions({
      fetch (dispatch, payload) {
        return dispatch(this.storeCollection + '/fetch', payload)
      },
      destroy (dispatch, payload) {
        return dispatch(this.storeCollection + '/destroy', payload)
      }
    })
  },
  computed: {
    ...mapState({
      columns (state, getters) {
        return getters[`${this.storeCollection}/columns`]
      },
      params (state, getters) {
        return getters[`${this.storeCollection}/params`]
      }
    }),
    storeCollection() {
      const route = useRoute()
      const { collection } = route.params
      const storeCollection = this.collection || collection
      return storeCollection
    }
  },
}
</script>
