export const collection = 'users'
export const form = {}
export const validation = {}
export const data = []
export const columns = [
  {
    name: 'first_name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    format: (val, row) => `${row.first_name} ${row.last_name}`,
    sortable: true
  },
  {
    name: 'username',
    align: 'left',
    label: 'Username',
    field: 'username',
    sortable: true
  },
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: 'email',
    sortable: true
  },
  {
    name: 'phone',
    align: 'left',
    label: 'Phone',
    field: 'phone',
    sortable: true,
    format: (val, row) => val || ' - '
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
