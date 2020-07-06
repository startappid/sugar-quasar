<template>
  <q-file
    v-model="files"
    label="Pick files"
    filled
    counter
    :counter-label="counterLabelFn"
    max-files="3"
    multiple
  >
    <template v-slot:prepend>
      <q-icon name="attach_file" />
    </template>
  </q-file>
</template>

<script>
export default {
  name: 'XFile',
  data () {
    return {
      files: null
    }
  },

  methods: {
    counterLabelFn ({ totalSize, filesNumber, maxFiles }) {
      return `${filesNumber} files of ${maxFiles} | ${totalSize}`
    }
  }
}
</script>
