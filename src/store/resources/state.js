export const collection = null
export const form = {}
export const validation = {}
export const data = []
export const columns = []

export default () => {
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
