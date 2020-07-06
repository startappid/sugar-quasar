export const collection = 'question_categories'
export const form = {}
export const validation = {}
export const data = []
export const columns = [
  {
    name: 'name',
    align: 'left',
    label: 'Name',
    field: 'name',
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
