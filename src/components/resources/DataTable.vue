<template>
  <q-table
    ref="tableRef"
    :title="collectionName"
    :rows="data"
    :columns="columns"
    row-key="id"
    :pagination="pagination"
    :rows-per-page-options="pageOptions"
    :loading="loading"
    :filter="filter"
    @request="onRequest"
    binary-state-sort
    :selected-rows-label="getSelectedString"
    selection="multiple"
    :selected="selected"
    @selection="onSelection"
    @row-click="rowClick"
  >
    <template v-slot:top-right>

      <q-btn flat round dense icon="visibility" class="q-mr-sm" v-if="selected.length==1&&isStateFormEntries" @click="showSelected()" />
      <q-btn flat round dense icon="create" class="q-mr-sm" v-if="selected.length==1&&isStateFormEntries" @click="editSelected()" />
      <q-separator vertical inset v-if="selected.length==1&&isStateFormEntries" />
      <q-btn flat round dense icon="delete" class="q-mr-sm q-ml-sm" color="negative"  v-if="selected.length>=1&&isStateFormEntries" @click="deleteSelected()" />

      <q-btn flat rounded dense icon="visibility" class="q-mr-sm" v-if="selected.length==1&&isStateFormTrash" @click="showSelected()" />
      <q-separator vertical inset v-if="selected.length==1&&isStateFormTrash" />
      <q-btn flat rounded dense icon="restore_from_trash" class="q-mr-sm q-ml-sm" v-if="selected.length>=1&&isStateFormTrash" @click="restoreSelected()"/>
      <q-btn flat rounded dense icon="delete_forever" class="q-mr-sm" color="negative"  v-if="selected.length>=1&&isStateFormTrash" @click="deleteSelected()" />

      <q-input filled dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:body-cell-action="props">
      <q-td v-show="isStateFormEntries" :props="props" @click.stop.prevent>
        <q-btn flat round dense icon="more_vert">
          <q-menu
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list>
              <q-item clickable v-close-popup tabindex="0" :to="`/${collection}/${props.row.id}`">
                <q-item-section avatar>
                  <q-avatar icon="remove_red_eye" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Detail</q-item-label>
                  <q-item-label caption>Detail Record</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup tabindex="0" :to="`/${collection}/${props.row.id}/edit`">
                <q-item-section avatar>
                  <q-avatar icon="edit" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Edit</q-item-label>
                  <q-item-label caption>Edit Record</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset spaced />
              <q-item clickable v-close-popup tabindex="0" @click="confirmDelete(props.row.id)">
                <q-item-section avatar>
                  <q-avatar icon="delete" color="negative" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Delete</q-item-label>
                  <q-item-label caption>Delete this record</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
      <q-td v-show="isStateFormTrash" :props="props" @click.stop.prevent>
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

    <!-- Pass on all named slots -->
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData"><slot :name="name" v-bind="slotData" /></template>
  </q-table>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  name: 'DataTable',
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
    stateForm: {
      type: String,
      default: () => 'entries'
    },
    trash: {
      type: Function,
      default: () => {}
    },
    restore: {
      type: Function,
      default: () => {}
    },
    stateData: {
      type: String,
      default: null
    }
  },
  setup (props) {
    const $q = useQuasar()

    const selected = ref([])
    const rows = ref([])
    const selectedRow = ref(null)
    const lastIndex = ref(null)
    const tableRef = ref(null)

    return {
      selected,
      selectedRow,
      lastIndex,
      tableRef,

      rows,

      getSelectedString () {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
      },

      onSelection ({ rows, added, evt }) {
        if (rows.length === 0 || tableRef.value === void 0) {
          return
        }

        const row = rows[ 0 ]
        const filteredSortedRows = tableRef.value.filteredSortedRows
        const rowIndex = filteredSortedRows.indexOf(row)
        const localLastIndex = lastIndex.value

        lastIndex.value = rowIndex
        document.getSelection().removeAllRanges()

        if ($q.platform.is.mobile === true) {
          evt = { ctrlKey: true }
        }
        else if (evt !== Object(evt) || (evt.shiftKey !== true && evt.ctrlKey !== true)) {
          selected.value = added === true ? rows : []
          return
        }

        const operateSelection = added === true
          ? selRow => {
            const selectedIndex = selected.value.indexOf(selRow)
            if (selectedIndex === -1) {
              selected.value = selected.value.concat(selRow)
            }
          }
          : selRow => {
            const selectedIndex = selected.value.indexOf(selRow)
            if (selectedIndex > -1) {
              selected.value = selected.value.slice(0, selectedIndex).concat(selected.value.slice(selectedIndex + 1))
            }
          }

        if (localLastIndex === null || evt.shiftKey !== true) {
          operateSelection(row)
          return
        }

        const from = localLastIndex < rowIndex ? localLastIndex : rowIndex
        const to = localLastIndex < rowIndex ? rowIndex : localLastIndex
        for (let i = from; i <= to; i += 1) {
          operateSelection(filteredSortedRows[ i ])
        }
      },

      getSelectedRows () {
        return selected.value.length
      },
    }
  },
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 25, // limit default set 25
        rowsNumber: 0 // total records
      },
      pageOptions: [5, 10, 25, 50, 100],
    }
  },
  mounted () {
    const pagination = this.pagination
    const filter = this.filter
    this.onRequest({ pagination, filter })
  },
  watch: {
    stateData: function (newVal, oldVal) {
      const pagination = this.pagination
      const filter = this.filter
      this.onRequest({ pagination, filter })
    },
    collection: function (newVal, oldVal) {
      // this.collection = newVal
      const pagination = this.pagination
      const filter = this.filter
      this.rows.value = []
      this.onRequest({ pagination, filter })
    }
  },
  methods: {
    onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter
      const params = {
        ...this.params,
        search: filter,
        page: page,
        limit: rowsPerPage,
        orderBy: {
          [sortBy]: descending ? 'desc' : 'asc'
        }
      }

      this.loading = true
      this.fetch({ params }).then((response) => {
        const { data, total } = response
        this.rows.value = data
        this.pagination.rowsNumber = total

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
      })
      .onOk(() => {
        this.destroy({
          type: id,
          params: {}
        })
        .then((response) => {
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
        })
        .catch(error => {
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
      })
    },
    showSelected () {
      const data = this.selected[0]
      const trashed = this.stateForm == 'trash'? '/trashed': ''
      this.$router.push(`/${this.collection}/${data.id}${trashed}`)
    },
    editSelected () {
      const data = this.selected[0]
      this.$router.push(`/${this.collection}/${data.id}/edit`)
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
      })
      .onOk(() => {
        this.restore({
          type: id,
          params: {}
        })
        .then((response) => {
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
        })
        .catch(error => {
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
      })
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
      })
      .onOk(() => {
        this.restore({
          type: 'selected',
          data: {
            selected: ids
          }
        })
        .then((response) => {
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
        })
        .catch(error => {
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
      })
    },

    rowClick (evt, row, index) {
      const trashed = this.stateForm == 'trash'? '/trashed': ''
      this.$router.push(`/${this.collection}/${row.id}${trashed}`)
    }
  },
  computed: {
    data () {
      return this.rows.value
    },
    collectionName () {
      const words = this.collection.split('_')
      const titles = []
      for (const key in words) {
        const word = words[key]
        titles.push(word.charAt(0).toUpperCase() + word.slice(1))
      }
      return titles.join(' ')
    },
    isStateFormEntries () {
      return this.stateForm === 'entries'
    },
    isStateFormTrash () {
      return this.stateForm === 'trash'
    }
  }
}
</script>
