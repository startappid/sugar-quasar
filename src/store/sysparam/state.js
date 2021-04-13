import state from '../resources/state'
export const collection = 'sysparam'
export const columns = []
export const form = {}
export const layout = []
export const validation = {}
export const route = {}

export default function () {
  return {
    ...state(),
    // Collection name
    collection,
    // Datatable config
    columns,
    form,
    layout,
    validation,
    route
  }
}
