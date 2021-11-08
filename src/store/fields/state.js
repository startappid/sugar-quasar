import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'fields'
export const params = {
  relationship: ['degree', 'major']
}

export const columns = [
  {
    name: 'degree',
    required: true,
    label: 'Degree',
    align: 'left',
    field: 'degree',
    format: (val, row) => `${row.degree.title}`,
    sortable: true
  },
  {
    name: 'major',
    required: true,
    label: 'Major',
    align: 'left',
    field: 'major',
    format: (val, row) => `${row.major.title}`,
    sortable: true
  },
  {
    name: 'title',
    required: true,
    label: 'Field',
    align: 'left',
    field: 'field',
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
  degree_id: null,
  major_id: null,
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
      updateValues: ['major_id'], // update values to be null on value changed
      events: {}
    },
    {
      type: 'QSelect',
      col: 'col-4',
      name: 'major_id',
      label: 'Major',
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
      reference: 'majors',
      params: ['degree_id'], // additional params on searching
      events: {}
    },
    {
      type: 'QInput',
      col: 'col-2',
      name: 'title',
      label: 'Field',
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
  major_id: { required },
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
