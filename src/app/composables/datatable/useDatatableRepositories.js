import { useQuasar } from 'quasar'
import { toRefs, reactive } from 'vue'

export default function useDatatableRepositories(props) {

  const $q = useQuasar()

  const { params } = props

  const filter = reactive('')
  let loading = reactive(false)
  const pagination = reactive({
    sortBy: 'id',
    descending: true,
    page: 1,
    rowsPerPage: 10, // limit default set 25
    rowsNumber: 0 // total records
  })
  const pageOptions = reactive([5, 10, 25, 50, 100])

  const onRequest = async ({ filters, pagination }) => {
    const { page, rowsPerPage, sortBy, descending } = pagination
    let filter = {}
    if(filters) {
      filter = { ...filters }
    }
    const search = filter
    const parameters = {
      ...params,
      ...filter,
      search,
      page: page,
      limit: rowsPerPage,
      // [`orderby[${sortBy}]`]: descending ? 'desc' : 'asc'
    }

    const orderby = Object.keys(parameters).find((index, item) => index.startsWith("orderby"))
    if(!orderby && sortBy) {
      parameters[[`orderby[${sortBy}]`]] = descending ? 'desc' : 'asc'
    }

    loading = true
    this.fetch({ params: parameters }).then((response) => {
      const { data, meta } = response
      pagination.rowsNumber = meta.recordsFiltered
      pagination.page = page
      pagination.rowsPerPage = rowsPerPage
      pagination.sortBy = sortBy
      pagination.descending = descending
      this.rows.value = data
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
  }

  return {
    filter,
    loading,
    pagination,
    pageOptions,
    onRequest
  }
}
