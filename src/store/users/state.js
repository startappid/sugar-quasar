export const collection = 'users'
export const form = {}
export const validation = {}
export const data = []
export const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    format: (val, row) => `${row.first_name} ${row.last_name}`,
    sortable: false // FIXME: sortable off for temporary
  },
  {
    name: 'username',
    align: 'left',
    label: 'Username',
    field: 'username',
    sortable: false // FIXME: sortable off for temporary
  },
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: 'email',
    sortable: false // FIXME: sortable off for temporary
  },
  {
    name: 'phone',
    align: 'left',
    label: 'Phone',
    field: 'phone',
    sortable: false, // FIXME: sortable off for temporary,
    format: (val, row) => val || ' - '
  },
  {
    name: 'is_active',
    align: 'left',
    label: 'Status',
    field: 'is_active',
    sortable: false, // FIXME: sortable off for temporary,
    format: (val, row) => parseInt(val) === 1 ? 'Active' : 'Inactive'
  },
  {
    name: 'checkin',
    align: 'left',
    label: 'Last Active',
    field: 'checkin',
    sortable: false, // FIXME: sortable off for temporary,
    format: (val, row) => {
      if (row.checkin == null) return '-'
      return row.checkin.created_at
    }
  },
  // Always give this columns as default
  {
    name: 'action',
    label: null,
    field: 'key'
  }
]

export default function () {
  return {
    // Collection name
    collection,
    // Form data input
    form,
    // Form validation
    validation, // for validation use vuelidate
    // Data fetched from API
    data,
    // Datatable config
    columns
  }
}
