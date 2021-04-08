<template>
  <div>
    <div class="text-subtitle">{{label}}</div>
    <div class="row q-gutter-md q-mb-md" v-for="(item, key) of list" :key="key">
      <div class="col-2">
        <q-select
          outlined
          v-model="item.type"
          :options="options"
          label="Type"
          @input="updateData"
          :readonly="readonly"
        />
      </div>
      <div class="col-2">
        <q-select
          outlined
          v-model="item.mode"
          :options="optionsMode"
          label="Mode"
          @input="updateData"
          :readonly="readonly"
        />
      </div>
      <div class="col">
        <q-input
          outlined
          autogrow
          v-model="item.url"
          @input="updateData"
          label="URL"
          :readonly="readonly"
        >
          <template v-slot:after v-if="!readonly">
            <q-btn round dense flat icon="remove" color="red" @click="removeItem(key)" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-gutter-md q-mb-md">
      <q-btn flat icon="add" color="green" label="Add Item" @click="addItem" />
      <!-- <q-btn color="primary" flat icon="mail"  /> -->
    </div>
  </div>
</template>

<script>
const data = {
  type: null,
  mode: null,
  url: null
}

const options = [
  'tokopedia',
  'shopee',
  'lazada',
  'bukalapak',
  'website',
  'other'
]

const optionsMode = [
  'desktop',
  'mobile'
]

export default {
  name: 'FieldShops',
  props: {
    value: {
      // type: Array,
      required: true,
      default () {
        return [data]
      }
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
      list: [data],
      options,
      optionsMode
    }
  },
  methods: {
    addItem () {
      this.list.push({
        type: null,
        mode: null,
        url: null
      })
    },
    removeItem (index) {
      this.list.splice(index, 1)
    },
    updateData () {
      const data = this.list
      this.$emit('input', data)
    }
  },
  watch: {
    value (value) {
      if (value != null && typeof value === 'object' && value.length) {
        this.list = value
      }
    }
  },
  mounted () {
    if (this.value != null && typeof value === 'object' && this.value.length) {
      this.list = this.value
    }

    if (this.value === null) {
      this.list = [{
        type: null,
        mode: null,
        url: null
      }]
    }
  },
  computed: {}
}
</script>
