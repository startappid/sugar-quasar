import { required } from 'vuelidate/lib/validators'
import state from '../resources/state'
export const collection = 'provinces'
export const columns = [
  {
    name: 'country_id',
    required: true,
    label: 'Country',
    align: 'left',
    field: 'country_id',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'isocode',
    required: true,
    label: 'ISO Code ',
    align: 'left',
    field: 'isocode',
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
  isocode: null,
  name: null,
  country_id: null
}

export const layout = [
  [
    {
      type: 'QSelect',
      col: 'col-4',
      name: 'country_id',
      label: 'Country',
      props: {
        options: [],
        'use-input': true,
        'emit-value': true,
        'map-options': true,
        'option-value': 'id',
        'option-label': 'name',
        'hide-selected': true,
        'fill-input': true
      },
      reference: 'countries',
      events: {}
    },
    {
      type: 'QInput',
      col: 'col-5',
      name: 'name',
      label: 'Province Name',
      props: {
        maxlength: 50
      }
    },
    {
      type: 'QInput',
      col: 'col-2',
      name: 'isocode',
      label: 'ISO Code',
      props: {
        maxlength: 10
      }
    }
  ]
]

export const validation = {
  isocode: {
    required
  },
  name: {
    required
  },
  country_id: {
    required
  }
}

export default function () {
  return {
    ...state(),
    // Collection name
    collection,
    // Datatable config
    columns,
    form,
    layout,
    validation
  }
}
