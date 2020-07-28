<template>
<div>
  <div class="row q-gutter-md q-my-md" v-for="(fields, index) in layout" :key="`row-${index}`">
    <div :class="field.col"  v-for="field in fields" :key="`form-${field.name}`">
      <component
        v-bind:is="field.type"
        filled
        v-model="form[field.name]"
        :readonly="readonly"
        :label="field.label"
        stack-label
        v-bind="field.props"
        :error="$v.form[field.name].$error"
        clearable
      />
    </div>
  </div>
</div>
</template>

<script>
import {
  QInput
} from 'quasar'

export default {
  name: 'FormFactory',
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    // Layout form generate
    layout: {
      type: Array,
      default: () => []
    },
    validation: {
      type: Object,
      default: () => {}
    },
    readonly: {
      type: Boolean,
      default: true
    },
    collection: {
      type: String,
      default: () => ''
    },
    stateForm: {
      type: String,
      default: () => 'show'
    },
    id: {
      type: String,
      default: null
    }
  },
  components: {
    QInput
  //   QSelect,
  //   QFile,
  //   QField,
  //   QRadio,
  //   QCheckbox,
  //   QToggle,
  //   QBtnToggle,
  //   QOptionGroup,
  //   QSlider,
  //   QRange,
  //   QTime,
  //   QDate
  },
  mounted () {

  },
  data () {
    return {
      submitAndCreate: false,
      isPwd: true,
      loading: false
    }
  },
  validations () {
    return {
      form: this.validation
    }
  }
}
</script>
