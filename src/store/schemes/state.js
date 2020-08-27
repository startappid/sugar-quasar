import state from '../resources/state'
export const collection = 'schemes'
export const columns = []
export const form = {}
export const layout = []
export const validation = {}
export const schemes = [
  'countries'
]

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
    schemes
  }
}
