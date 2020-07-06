<template>
  <DataTableTrash
    :columns="columns"
    :fetch="trash"
    :destroy="hardDelete"
    :restore="restore"
    :collection="collection"
  />
</template>

<script>
import DataTableTrash from 'components/resources/DataTableTrash'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DataTableTrash
  },
  data () {
    return {
      collection: 'countries'
    }
  },
  methods: {
    ...mapActions('countries', ['trash', 'hardDelete', 'restore'])
  },
  computed: {
    ...mapGetters({
      columns: 'countries/columns'
    }),
    collectionName () {
      const words = this.collection.split('_')
      const titles = []
      for (const key in words) {
        const word = words[key]
        titles.push(word.charAt(0).toUpperCase() + word.slice(1))
      }
      return titles.join(' ')
    }
  }
}
</script>
