<template>
  <div class="q-pa-md shadow-1">
    <div class="text-h5">{{titlePage}} {{collectionName}}</div>
    <FormFactory
      :collection="collection"
      :stateForm="stateForm"
    />

  </div>
</template>
<script>
import FormFactory from 'components/form/FormFactory'

export default {
  name: 'UsersForm',
  components: {
    FormFactory
  },
  props: {
    collection: {
      type: String,
      default: () => ''
    },
    stateForm: {
      type: String,
      default: () => ''
    },
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      // form: {
      //   isocode: null,
      //   name: null,
      //   phonecode: null
      // },
      submitAndCreate: false,
      isPwd: true,
      loading: false,
      readonly: this.stateForm === 'show'
    }
  },
  computed: {
    collectionName () {
      const words = this.collection.split('_')
      const titles = []
      for (const key in words) {
        const word = words[key]
        titles.push(word.charAt(0).toUpperCase() + word.slice(1))
      }
      return titles.join(' ')
    },
    titlePage () {
      let title = ''
      if (this.stateForm === 'create') title = 'Create New'
      if (this.stateForm === 'show') title = 'Detail'
      return title
    }
  }
}
</script>
