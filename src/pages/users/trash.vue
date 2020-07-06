<template>
  <DataTableTrash
    :columns="columns"
    :fetch="trash"
    :destroy="hardDelete"
    :restore="restore"
    :collection="collection"
    :params="params"
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
      collection: 'users',
      params: {
        role: 'admin',
        withtrashed: true
      }
    }
  },
  methods: {
    ...mapActions('users', ['trash', 'hardDelete', 'restore'])
  },
  computed: {
    ...mapGetters({
      columns: 'users/columns'
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
