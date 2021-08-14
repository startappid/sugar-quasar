import state from '../resources/state'

export const collection = 'sysparams'
export const params = {
  // 'orderby[name]': 'asc'
}
export const form = {
  group: null,
  key: null,
  value: null,
  data: null,
  order: 0,
  status: 'active',
}
export const resetValue = {...form}

export const columns = [
  {
    name: 'group',
    required: true,
    label: 'Group',
    align: 'left',
    field: 'group',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'key',
    required: true,
    label: 'Key',
    align: 'left',
    field: 'key',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'value',
    required: true,
    label: 'Value',
    align: 'left',
    field: 'value',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'order',
    required: true,
    label: 'Order',
    align: 'left',
    field: 'order',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: 'status',
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

export const layout = []
export const validation = {}
export const data = []
export const route = {}

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
    validation,
    route
  }
}
