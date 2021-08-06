import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'degrees'
export const params = {}

export const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: 'title',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'description',
    required: true,
    label: 'Description',
    align: 'left',
    field: 'description',
    format: (val) => val,
    sortable: true
  },

  // Always give this columns as default
  {
    name: 'action',
    label: null,
    field: 'key'
  }
]

export const form = {
  title: null,
  description: '',
}
export const resetValue = {...form}
export const layout = [
  [
    {
      type: 'QInput',
      col: 'col',
      name: 'title',
      label: 'Title',
      props: {
        maxlength: 1024
      },
      events: {}
    },
  ],
  [
    {
      type: 'QEditor',
      col: 'col',
      name: 'description',
      label: 'Description',
      props: {},
      events: {}
    },
  ],
]

export const validation = {
  title: { required },
  description: { }
}

export default function () {
  return {
    ...state(),
    // Collection name
    collection,
    params,
    // Datatable config
    columns,
    form,
    resetValue,
    layout,
    validation
  }
}
