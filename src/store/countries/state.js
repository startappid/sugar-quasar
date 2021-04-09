import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'countries'
export const columns = [
  {
    name: 'isocode',
    required: true,
    label: 'ISO Code ',
    align: 'left',
    field: 'isocode',
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
    name: 'phonecode',
    required: true,
    label: 'Phone Code',
    align: 'left',
    field: 'phonecode',
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
  phonecode: null
}

export const layout = [
  [
    {
      type: 'QInput',
      col: 'col-2',
      name: 'isocode',
      label: 'ISO Code',
      props: {
        maxlength: 2
      }
    },
    {
      type: 'QInput',
      col: 'col-6',
      name: 'name',
      label: 'Country Name',
      props: {
        maxlength: 50
      }
    },
    {
      type: 'QInput',
      col: 'col-2',
      name: 'phonecode',
      label: 'Phone Code',
      props: {
        maxlength: 3
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
  phonecode: {
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
    resetValue: {
      ...form
    },
    layout,
    validation
  }
}
