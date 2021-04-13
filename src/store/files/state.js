import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'files'

export const columns = [
  {
    name: 'file',
    required: true,
    label: 'File',
    align: 'left',
    field: 'filename',
    format: (val, row) => val,
    sortable: false,
    style: 'width: 120px'
  },
  {
    name: 'caption',
    required: true,
    label: 'Caption',
    align: 'left',
    field: 'title',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'information',
    required: true,
    label: 'Information',
    align: 'left',
    field: 'size',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'download',
    label: null,
    style: 'width: 50px',
    field: 'key'
  },
  // Always give this columns as default
  {
    name: 'action',
    style: 'width: 50px',
    label: null,
    field: 'key'
  }
]

export const form = {
  file: null,
  title: null,
  description: null,
  type: 'other',
  fullpath: null // NOTE: fullpath will not be submited
}

export const layout = [
  [
    {
      type: 'QFile',
      col: 'col',
      name: 'file',
      label: 'FIle',
      icon: 'insert_drive_file', // movie, photo, audiotrack, insert_drive_file
      imgfield: 'fullpath', // NOTE: field wil be shown
      props: {
        maxlength: 1024
      }
    }
  ],
  [
    {
      type: 'QInput',
      col: 'col',
      name: 'title',
      label: 'Title',
      props: {
        maxlength: 1024,
        autogrow: true
      }
    }
  ],
  [
    {
      type: 'QInput',
      col: 'col',
      name: 'description',
      label: 'Description',
      props: {
        maxlength: 1024,
        autogrow: true
      }
    }
  ],
  [
    {
      type: 'QRadio',
      col: 'col',
      name: 'type',
      label: 'Type',
      props: {
        options: [
          {
            label: 'Compress',
            value: 'compress'
          },
          {
            label: 'Documents',
            value: 'document'
          },
          {
            label: 'Image',
            value: 'image'
          },
          {
            label: 'Other',
            value: 'other'
          }
        ]
      },
      events: {}
    }
  ]
]

export const validation = {
  file: {},
  title: {},
  description: {},
  type: {
    required
  }
}

export const headers = {
  'Content-Type': 'multipart/form-data'
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
    validation,
    headers
  }
}
