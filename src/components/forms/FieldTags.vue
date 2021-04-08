<template>
  <div class="row q-gutter-md q-mb-md">
    <div class="col">
      <q-select
        :label="label"
        outlined
        v-model="tags"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        new-value-mode="add-unique"
        @input="updateData"
        :readonly="readonly"
        hint="Enter to insert tag"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldTags',
  props: {
    value: {
      type: Array,
      required: true,
      default: null
    },
    label: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data () {
    return {
      tags: []
    }
  },
  methods: {
    updateData () {
      const data = this.tags
      this.$emit('input', data)
    }
  },
  watch: {
    value (value) {
      this.tags = value
    }
  },
  mounted () {
    if (this.value) {
      this.tags = this.value
    }
  },
  computed: {}
}
</script>
