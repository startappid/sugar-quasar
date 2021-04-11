<template>
<div class="q-mt-md">
  <q-form ref="formComponent" @submit.prevent>
  <div class="row q-gutter-md" v-for="(fields, index) in layout" :key="`row-${index}`">
    <div :class="field.col" v-for="field in fields" :key="`form-${field.name}`">
      <div v-if="['QInput'].indexOf(field.type) >= 0">
        <component
          v-bind:is="field.type"
          outlined
          v-model="form[field.name]"
          :readonly="readonly"
          :label="field.label"
          stack-label
          v-bind="field.props"
          v-on="field.events"
          :error="v$.form[field.name].$error"
          clearable
        />
      </div>

      <div v-if="['QTextarea'].indexOf(field.type) >= 0">
        <q-input
          outlined
          v-model="form[field.name]"
          type="textarea"
          :readonly="readonly"
          :label="field.label"
          stack-label
          v-bind="field.props"
          v-on="field.events"
          :error="v$.form[field.name].$error"
          clearable
        />
      </div>

      <div v-if="['QNumber'].indexOf(field.type) >= 0">
        <component
          v-bind:is="'QInput'"
          outlined
          type="number"
          v-model="form[field.name]"
          :readonly="readonly"
          :label="field.label"
          stack-label
          v-bind="field.props"
          v-on="field.events"
          :error="v$.form[field.name].$error"
          clearable
        />
      </div>

      <div v-if="['QSelect'].indexOf(field.type) >= 0">
        <component
          v-bind:is="field.type"
          outlined
          v-model="form[field.name]"
          :readonly="readonly"
          :label="field.label"
          stack-label
          v-bind="field.props"
          v-on="field.events"
          :error="v$.form[field.name].$error"
          clearable
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-italic text-grey">
                Data not found
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:after v-if="field.referenceManager">
            <q-item>
              <q-item-section>
                <q-btn
                  style="margin-left: -20px"
                  icon="add"
                  flat
                  round
                  color="secondary"
                  @click="opendialog(field)"
                >
                  <q-tooltip :delay="1000" anchor="top middle" self="bottom middle" :offset="[10, 10]">Add new data</q-tooltip>
                </q-btn>
              </q-item-section>
            </q-item>
          </template>

        </component>
      </div>

      <div v-if="['QRadio'].indexOf(field.type) >= 0">
        {{field.label}}:
        <component
          v-for="option in field.props.options"
          :key="`form-radio-${option.value}`"
          v-bind:is="field.type"
          v-model="form[field.name]"
          :readonly="readonly"
          :label="option.label"
          :val="option.value"
          stack-label
          v-bind="field.props"
          v-on="field.events"
          :error="v$.form[field.name].$error"
          clearable
        />
      </div>

      <div v-if="['QFile'].indexOf(field.type) >= 0">
        <q-img
          v-if="['show', 'update', 'trashed'].indexOf(stateForm) >= 0"
          :src="form[field.imgfield]"
          spinner-color="white"
          style="max-width: 600px"
          class="q-mb-md"
        />

        <component
          v-if="!readonly"
          v-bind:is="field.type"
          outlined
          v-model="form[field.name]"
          :readonly="readonly"
          :label="field.label"
          stack-label
          v-bind="field.props"
          v-on="field.events"
          :error="v$.form[field.name].$error"
          clearable
        >
          <template v-slot:file="{ file }">
            <q-chip
              class="full-width q-my-md"
              square
            >
              <q-avatar>
                <q-icon :name="field.icon||'insert_drive_file'" />
              </q-avatar>

              <div class="ellipsis relative-position">
                {{ file.name }}
              </div>

              <q-tooltip>
                {{ file.name }}
              </q-tooltip>
            </q-chip>
            <q-img
              v-if="file.type.indexOf('image/') === 0"
              :src="readSrcFile(file)"
              spinner-color="white"
              style="height: 200px; max-width: 360px"
              class="rounded-borders"
              :ratio="50/10"
            />
          </template>
        </component>
      </div>

      <div v-if="['QEditor'].indexOf(field.type) >= 0">
        <div class="text-subtitle">{{field.label}}</div>
        <component
          v-bind:is="field.type"
          v-model="form[field.name]"
          class="q-mb-md"
        />
      </div>

      <div v-if="['QToggle'].indexOf(field.type) >= 0">
        <q-toggle
          :label="field.label"
          v-model="form[field.name]"
          :readonly="readonly"
          stack-label
          v-bind="field.props"
          v-on="field.events"
        />
      </div>

    </div>
  </div>
  </q-form>

  <q-dialog v-model="dialogForms" >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Create New {{referenceCollectionName}}</div>
      </q-card-section>

      <q-card-section>
        <FormFactoryComponent
          :collection="dialogReference"
          :stateForm="'create'"
          :onCreated="dialogFormsonCreated"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapActions, mapState, mapMutations } from 'vuex'
import FormFactoryComponent from 'components/form/FormFactoryComponent'

import {
  QInput,
  QSelect,
  QFile,
  QRadio,
  QEditor,
  QToggle
} from 'quasar'

export default {
  name: 'FormGenerator',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  props: {
    collection: {
      type: String,
      default: () => ''
    },
    stateForm: {
      type: String,
      default: () => 'entries'
    },
    layout: {
      type: Object,
      default: null
    },
    validation: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: null
    }
  },
  components: {
    QInput,
    QSelect,
    QFile,
    //   QField,
    QRadio,
    QEditor,
    //   QCheckbox,
    QToggle,
    //   QBtnToggle,
    //   QOptionGroup,
    //   QSlider,
    //   QRange,
    //   QTime,
    //   QDate,
    FormFactoryComponent,
  },
  inject: ['form'],
  data () {
    return {
      submitAndCreate: false,
      isPwd: true,
      loading: false,
      readonly: this.stateForm === 'show',
      dialogForms: false,
      dialogReference: ''
    }
  },
  created () {
    for (const fields of this.layout) {
      for (const field of fields) {
        const { type, reference, events } = field
        if (type === 'QSelect' && reference) {
          events.filter = (search, update, abort) => {
            const params = {
              search
            }

            if (field.params) {
              for (const key of field.params) {
                params[key] = this.form[key]
              }
            }

            this.$store.dispatch(`${reference}/fetch`, { params }).then(response => {
              const { data } = response
              const { props } = field
              update(() => {
                props.options = data
                if (field.updateValues) {
                  for (const key of field.updateValues) {
                    this.form[key] = null
                  }
                }
              })
            }).catch(error => {
              if (error.response) {
                const { data } = error.response
                this.$q.dialog({
                  title: `${data.status}`,
                  message: `${data.message}`,
                  ok: {
                    flat: true
                  },
                  persistent: true
                })
              }
            })
          }
        }
      }
    }
  },
  beforeUnmount () {
    this.$store.commit(`${this.collection}/reset`)
  },
  mounted () {
    for (const fields of this.layout) {
      for (const field of fields) {
        const { type, reference } = field
        if (type === 'QSelect' && reference) {
          this.$store.dispatch(`${reference}/fetch`, {}).then(response => {
            const { data } = response
            const { props } = field
            props.options = data
          }).catch(error => {
            if (error.response) {
              const { data } = error.response
              this.$q.dialog({
                title: `${data.status}`,
                message: `${data.message}`,
                ok: {
                  flat: true
                },
                persistent: true
              })
            }
          })
        }
      }
    }
  },
  methods: {
    ...mapActions({
      create (dispatch, payload) {
        return dispatch(this.collection + '/create', payload)
      },
      detail (dispatch, payload) {
        return dispatch(this.collection + '/detail', payload)
      },
      update (dispatch, payload) {
        return dispatch(this.collection + '/update', payload)
      },
      patch (dispatch, payload) {
        return dispatch(this.collection + '/patch', payload)
      },
      destroy (dispatch, payload) {
        return dispatch(this.collection + '/destroy', payload)
      },
      hardDelete (dispatch, payload) {
        return dispatch(this.collection + '/hardDelete', payload)
      },
      trashed (dispatch, payload) {
        return dispatch(this.collection + '/trashed', payload)
      },
      restore (dispatch, payload) {
        return dispatch(this.collection + '/restore', payload)
      }
    }),

    setFormData(data) {
      this.form = data
    },
    resetForm() {
      this.$refs.formComponent.reset()
      this.v$.$reset()
    },

    validateError () {
      this.v$.$touch()
      return this.v$.$error
    },

    readSrcFile (file) {
      return URL.createObjectURL(file)
    },
    opendialog (field) {
      this.dialogForms = true
      this.dialogReference = field.reference
    },
    dialogFormsonCreated () {
      this.dialogForms = false
    }
  },
  computed: {
    // ...mapGetters(`${this.collection}`, ['validation', 'form', 'layout']),
    // ...mapState({
    //   validation (state, getters) {
    //     return getters[`${this.collection}/validation`]
    //   },
    //   form (state, getters) {
    //     return getters[`${this.collection}/form`]
    //   },
    //   layout (state, getters) {
    //     return getters[`${this.collection}/layout`]
    //   }
    // }),
    referenceCollectionName () {
      const words = this.dialogReference.split('_')
      const titles = []
      for (const key in words) {
        const word = words[key]
        titles.push(word.charAt(0).toUpperCase() + word.slice(1))
      }
      return titles.join(' ')
    },
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
    },
    rulesPassword () {
      return this.stateForm === 'create'
        ? { required }
        : { }
    }
  },
  validations () {
    return {
      form: this.validation
    }
  }
}
</script>
