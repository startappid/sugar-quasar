import { required } from 'vuelidate/lib/validators'
import state from '../resources/state'
export const collection = 'images'

export const columns = [
  {
    name: 'image',
    required: true,
    label: 'Image',
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
  // Always give this columns as default
  {
    name: 'action',
    label: null,
    field: 'key'
  }
]

export const form = {
  file: null,
  title: null,
  alt: null,
  description: null,
  type: 'image',
  fullpath: null // NOTE: fullpath will not be submited
}

export const layout = [
  [
    {
      type: 'QFile',
      col: 'col',
      name: 'file',
      label: 'Image',
      icon: 'photo', // movie, photo, audiotrack, insert_drive_file
      imgfield: 'fullpath', // NOTE: field wil be shown
      props: {
        maxlength: 1024
      }
    }
  ],
  [
    {
      type: 'QInput',
      col: 'col-4',
      name: 'title',
      label: 'Title',
      props: {
        maxlength: 1024,
        autogrow: true
      }
    },
    {
      type: 'QInput',
      col: 'col-4',
      name: 'alt',
      label: 'Alternative',
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
            label: 'Image',
            value: 'image'
          },
          {
            label: 'Thumbnail',
            value: 'thumbnail'
          },
          {
            label: 'Banner',
            value: 'banner'
          },
          {
            label: 'Profile',
            value: 'profile'
          },
          {
            label: 'Icon',
            value: 'icon'
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
  alt: {},
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
