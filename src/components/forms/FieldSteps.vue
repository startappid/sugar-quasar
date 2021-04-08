<template>
  <div>
    <div class="text-subtitle">{{label}}</div>
    <div v-for="(item, key) of list" :key="key">
      <div class="row q-gutter-md q-mb-md">
        <div class="col-1">
          <q-input
            type="number"
            label="urutan"
            outlined
            v-model="item.urutan"
            @input="reorderIndex"
            :readonly="readonly"
          />
        </div>
        <div class="col">
          <q-input
            outlined
            autogrow
            v-model="item.text"
            @input="updateData"
            label="Step"
            :readonly="readonly"
          >
            <template v-slot:after v-if="!readonly">
              <q-btn round dense flat icon="add" color="green" v-if="key == (list.length - 1)" @click="addItem" />
              <q-btn round dense flat icon="remove" color="red" v-else @click="removeItem(key)" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <FieldFileUploader
            v-model="item.image"
            name="image"
            label="Image"
            :readonly="readonly"
            directory="recipe"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FieldFileUploader from 'components/forms/FieldFileUploader'
const data = {
  urutan: 1,
  image: null,
  text: null
}

export default {
  name: 'FieldSteps',
  props: {
    value: {
      type: Array,
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
  components: {
    FieldFileUploader
  },
  data () {
    return {
      list: [data]
    }
  },
  methods: {
    addItem () {
      const urutan = this.list.length + 1
      this.list.push({
        urutan: urutan,
        image: null,
        text: null
      })
    },
    removeItem (index) {
      this.list.splice(index, 1)
    },
    reorderIndex () {
      this.list.sort((a, b) => (a.urutan > b.urutan) ? 1 : -1)
      this.updateData()
    },
    updateData () {
      const data = this.list
      this.$emit('input', data)
    }
  },
  watch: {
    value (value) {
      this.list = value
    }
  },
  mounted () {
    if (typeof this.value === 'object' && this.value.length) {
      this.list = this.value
    }
  },
  computed: {}
}
</script>
