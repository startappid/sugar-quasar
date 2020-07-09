<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="collectionName" icon="home" :to="`/${collection}`" />
        <q-breadcrumbs-el label="Trash" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>

      <q-btn icon="delete_forever" class="q-mr-md" label="Empty Trash" flat color="negative" @click="emptyTrash()" />
      <q-btn icon="restore_from_trash" class="q-mr-md" label="Restore All" color="secondary" @click="restoreAll()"/>
    </q-toolbar>
    <q-table
      :title="collectionName"
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :rows-per-page-options="pageOptions"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
    >
      <template v-slot:top-right>

        <q-btn flat rounded dense icon="visibility" class="q-mr-sm" v-if="selected.length==1" @click="showSelected()" />
        <q-separator vertical inset v-if="selected.length==1" />
        <q-btn flat rounded dense icon="restore_from_trash" class="q-mr-sm q-ml-sm" v-if="selected.length>=1" @click="restoreSelected()"/>
        <q-btn flat rounded dense icon="delete_forever" class="q-mr-sm" color="negative"  v-if="selected.length>=1" @click="deleteSelected()" />

        <q-input filled dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn flat round dense icon="more_vert">
            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
            >
              <q-list>
                <q-item clickable v-close-popup tabindex="0" :to="`/${collection}/${props.row.id}/trashed`">
                  <q-item-section avatar>
                    <q-avatar icon="remove_red_eye" color="secondary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Detail</q-item-label>
                    <q-item-label caption>Detail Record</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup tabindex="0" @click="confirmRestore(props.row.id)">
                  <q-item-section avatar>
                    <q-avatar icon="restore_from_trash" color="secondary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Restore</q-item-label>
                    <q-item-label caption>Restore</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset spaced />
                <q-item clickable v-close-popup tabindex="0" @click="confirmDelete(props.row.id)">
                  <q-item-section avatar>
                    <q-avatar icon="delete" color="negative" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Delete</q-item-label>
                    <q-item-label caption>Delete forever</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  name: 'DataTableTrash',
  props: {
    collection: {
      type: String,
      default: () => ''
    },
    columns: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => {}
    },
    fetch: {
      type: Function,
      default: () => {}
    },
    destroy: {
      type: Function,
      default: () => {}
    },
    restore: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      selected: [],
      selectedRow: null,
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 25, // limit default set 25
        rowsNumber: 0 // total records
      },
      pageOptions: [5, 10, 25, 50, 100],
      data: []
    }
  },
  mounted () {
    const pagination = this.pagination
    const filter = this.filter
    this.onRequest({ pagination, filter })
  },
  methods: {
    onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter
      const params = {
        ...this.params,
        search: filter,
        page: page,
        limit: rowsPerPage
      }

      this.loading = true
      this.fetch(params).then((response) => {
        const { data, meta } = response
        this.data = data
        this.pagination.rowsNumber = meta.totalRecords

        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending
        this.loading = false
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
    },

    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },

    getSelectedRows () {
      return this.selected.length
    },

    confirmDelete (id) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure to delete?',
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
          type: id,
          params: {}
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
            const pagination = this.pagination
            const filter = this.filter
            this.onRequest({ pagination, filter })
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

    deleteSelected () {
      const ids = []
      for (const item of this.selected) {
        ids.push(item.id)
      }
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure to delete?',
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
          type: 'selected',
          data: {
            selected: ids
          }
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
            const pagination = this.pagination
            const filter = this.filter
            this.onRequest({ pagination, filter })
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
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },

    confirmRestore (id) {
      this.$q.dialog({
        title: 'Restore',
        message: 'Are you sure to restore?',
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
          type: id,
          params: {}
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
            const pagination = this.pagination
            const filter = this.filter
            this.onRequest({ pagination, filter })
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

    showSelected () {
      const data = this.selected[0]
      this.$router.push(`/${this.collection}/${data.id}/trashed`)
    },

    restoreSelected () {
      const ids = []
      for (const item of this.selected) {
        ids.push(item.id)
      }

      this.$q.dialog({
        title: 'Restore',
        message: 'Are you sure to restore?',
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
          type: 'selected',
          data: {
            selected: ids
          }
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
            const pagination = this.pagination
            const filter = this.filter
            this.onRequest({ pagination, filter })
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
            const pagination = this.pagination
            const filter = this.filter
            this.onRequest({ pagination, filter })
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
            const pagination = this.pagination
            const filter = this.filter
            this.onRequest({ pagination, filter })
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
