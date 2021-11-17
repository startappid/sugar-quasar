import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'majors'
export const params = {
  relationship: ['degree']
}

export const columns = [
  {
    name: 'title',
    required: true,
    label: 'Major',
    align: 'left',
    field: 'title',
    format: (val, row) => `${row.degree.title} ${row.title}`,
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
  degree_id: null,
  title: null,
  description: '',
}
export const resetValue = {...form}
export const layout = [
  [
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
    {
      type: 'QInput',
      col: 'col-2',
      name: 'title',
      label: 'Title',
      props: {
        type: 'text',
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
  degree_id: { required },
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
