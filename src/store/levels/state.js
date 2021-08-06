import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'levels'
export const params = {
  relationship: ['degree']
}

export const columns = [
  {
    name: 'level',
    required: true,
    label: 'Level',
    align: 'left',
    field: 'title',
    format: (val, row) => `${row.level} ${row.degree.title}`,
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
  level: null,
  degree_id: null,
}
export const resetValue = {...form}
export const layout = [
  [
    {
      type: 'QInput',
      col: 'col-2',
      name: 'level',
      label: 'Level',
      props: {
        type: 'number',
        maxlength: 1024
      },
      events: {}
    },
    {
      type: 'QSelect',
      col: 'col-4',
      name: 'degree_id',
      label: 'Degree',
      props: {
        options: [],
        'use-input': true,
        'emit-value': true,
        'map-options': true,
        'option-value': 'id',
        'option-label': 'title',
        'hide-selected': true,
        'fill-input': true
      },
      reference: 'degrees',
      events: {}
    },
  ],
]

export const validation = {
  level: { required },
  degree_id: { required }
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
