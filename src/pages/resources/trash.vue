<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="collectionName" :to="`/${collection}`" />
        <q-breadcrumbs-el label="Trash" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>

      <q-btn icon="delete_forever" class="q-mr-md" label="Empty Trash" flat color="negative" @click="emptyTrash()" />
      <q-btn icon="restore_from_trash" class="q-mr-md" label="Restore All" color="secondary" @click="restoreAll()"/>
    </q-toolbar>
    <DataTable
      :columns="columns"
      :fetch="trash"
      :destroy="destroy"
      :restore="restore"
      :collection="collection"
      :stateForm="stateForm"
      :stateData="stateData"
    />
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
      stateForm: 'trash', // entries, trash
      stateData: null
    }
  },
  methods: {
    // ...mapActions('countries', ['trash', 'hardDelete', 'restore']),
    ...mapActions({
      trash (dispatch, payload) {
        return dispatch(this.collection + '/trash', payload)
      },
      destroy (dispatch, payload) {
        return dispatch(this.collection + '/hardDelete', payload)
      },
      restore (dispatch, payload) {
        return dispatch(this.collection + '/restore', payload)
      }
    }),

    emptyTrash () {
      this.$q.dialog({
        title: 'Empty Trash',
        message: 'Are you sure to empty trash?',
        ok: {
          label: 'Delete',
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
        this.destroy({
          type: 'all'
        }).then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            this.stateData = new Date().toISOString()
          })
        }).catch(error => {
          if (error.response) {
            const { data } = error.response
            this.$q.dialog({
              title: `${data.status}`,
              message: `${data.message}`,
              ok: {
                flat: true
              },
              persistent: true
            })
          }
          this.loading = false
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },

    restoreAll () {
      this.$q.dialog({
        title: 'Restore All',
        message: 'Are you sure to restore all?',
        ok: {
          label: 'Restore',
          color: 'secondary',
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
        this.restore({
          type: 'all'
        }).then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            this.stateData = new Date().toISOString()
          })
        }).catch(error => {
          if (error.response) {
            const { data } = error.response
            this.$q.dialog({
              title: `${data.status}`,
              message: `${data.message}`,
              ok: {
                flat: true
              },
              persistent: true
            })
          }
          this.loading = false
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  },
  computed: {
    // ...mapGetters({ columns: 'countries/columns' }),
    ...mapState({
      columns (state, getters) {
        return getters[`${this.collection}/columns`]
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
