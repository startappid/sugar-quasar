export const collection = 'roles'
export const form = {}
export const validation = {}
export const data = []
export const columns = [
  {
    name: 'name',
    required: true,
    label: 'Role',
    align: 'left',
    field: 'name',
    format: (val) => val,
    sortable: false // FIXME: sortable off for temporary
  },
  {
    name: 'guard_name',
    required: true,
    label: 'Guard',
    align: 'left',
    field: 'guard_name',
    format: (val) => val,
    sortable: false // FIXME: sortable off for temporary
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
