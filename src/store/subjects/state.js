import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'subjects'
export const params = {
  relationship: ['class']
}

export const columns = [
  {
    name: 'title',
    required: true,
    label: 'Subject',
    align: 'left',
    field: 'title',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'class_id',
    required: true,
    label: 'Class',
    align: 'left',
    field: 'class_id',
    format: (val, row) => `${row.class.class}`,
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
  class_id: null,
  title: null,
  description: '',
}
export const resetValue = {...form}
export const layout = [
  [
    {
      type: 'QSelect',
      col: 'col-2',
      name: 'class_id',
      label: 'Class',
      props: {
        options: [],
        'use-input': true,
        'emit-value': true,
        'map-options': true,
        'option-value': 'id',
        'option-label': 'class',
        'hide-selected': true,
        'fill-input': true
      },
      reference: 'classes',
      updateValues: [], // update values to be null on value changed
      events: {}
    },
    {
      type: 'QInput',
      col: 'col',
      name: 'title',
      label: 'Subject',
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
  class_id: { required },
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
