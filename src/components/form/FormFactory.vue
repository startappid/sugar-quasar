<template>
<div class="q-mt-md">
  <div class="row q-gutter-md" v-for="(fields, index) in layout" :key="`row-${index}`">
    <div :class="field.col"  v-for="field in fields" :key="`form-${field.name}`">
      <component
        v-if="['QInput'].indexOf(field.type) >= 0"
        v-bind:is="field.type"
        outlined
        v-model="form[field.name]"
        :readonly="readonly"
        :label="field.label"
        stack-label
        v-bind="field.props"
        v-on="field.events"
        :error="$v.form[field.name].$error"
        clearable
      />

      <component
        v-if="['QSelect'].indexOf(field.type) >= 0"
        v-bind:is="field.type"
        outlined
        v-model="form[field.name]"
        :readonly="readonly"
        :label="field.label"
        stack-label
        v-bind="field.props"
        v-on="field.events"
        :error="$v.form[field.name].$error"
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
          :error="$v.form[field.name].$error"
          clearable
        />
      </div>

      <q-img
        v-if="['QFile'].indexOf(field.type) >= 0 && ['show', 'update', 'trashed'].indexOf(stateForm) >= 0"
        :src="form[field.imgfield]"
        spinner-color="white"
        style="max-width: 600px"
        class="q-mb-md"
      />

      <component
        v-if="['QFile'].indexOf(field.type) >= 0 && !readonly"
        v-bind:is="field.type"
        outlined
        v-model="form[field.name]"
        :readonly="readonly"
        :label="field.label"
        stack-label
        v-bind="field.props"
        v-on="field.events"
        :error="$v.form[field.name].$error"
        clearable
      >
        <template v-slot:file="{ index, file }">
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
  </div>

  <div class="q-mt-xl q-mb-md row justify-between" v-if="stateForm=='create'">
    <div>
      <q-toggle v-model="submitAndCreate" label="Submit and create new" />
    </div>
    <div class=" justify-end">
      <q-btn flat label="Cancel" :to="`/${collection}`" />
      <q-btn
        icon="check"
        class="q-ml-md bg-primary text-white"
        color="secondary"
        label="Create"
        :loading="loading"
        @click="submit" />
    </div>
  </div>

  <div class="q-mt-xl q-mb-md row justify-between" v-if="stateForm=='show'">
    <div>
      <q-btn flat label="Cancel" :to="`/${collection}`" />
    </div>
    <div class=" justify-end">
      <q-btn icon="delete" flat color="negative" label="Delete" @click="confirmDelete(id)" />
      <q-btn icon="edit" :loading="loading" class="q-ml-md bg-primary text-white" color="secondary" label="Edit" :to="`/${collection}/${$route.params.id}/edit`" />
    </div>
  </div>

  <div class="q-mt-xl q-mb-md row justify-between" v-if="stateForm=='update'">
    <div>
      <q-btn flat label="Cancel" :to="`/${collection}`" />
    </div>
    <div class=" justify-end">
      <q-btn icon="delete" flat color="negative" label="Delete" @click="confirmDelete(id)" />
      <q-btn icon="check" class="q-ml-md bg-primary text-white" color="secondary" label="Update" @click="submitUpdate" />
    </div>
  </div>

  <div class="q-mt-xl q-mb-md row justify-between" v-if="stateForm=='trashed'">
    <div>
      <q-btn flat label="Cancel" :to="`/${collection}/trash`" />
    </div>
    <div class=" justify-end">
      <q-btn icon="delete_forever" flat color="negative" label="Delete Forever" @click="confirmHardDelete(id)" />
      <q-btn icon="restore_from_trash" class="q-ml-md bg-primary text-white" color="secondary" label="Restore" @click="confirmRestore(id)" />
    </div>
  </div>

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
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState, mapMutations } from 'vuex'
import FormFactoryComponent from 'components/form/FormFactoryComponent'
import {
  QInput,
  QSelect,
  QFile,
  QRadio
} from 'quasar'

export default {
  name: 'FormFactory',
  props: {
    collection: {
      type: String,
      default: () => ''
    },
    stateForm: {
      type: String,
      default: () => 'entries'
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
    //   QCheckbox,
    //   QToggle,
    //   QBtnToggle,
    //   QOptionGroup,
    //   QSlider,
    //   QRange,
    //   QTime,
    //   QDate,
    FormFactoryComponent
  },
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
  mounted () {
    if (['show', 'update', 'trashed'].indexOf(this.stateForm) >= 0) {
      this.loading = true
      let fetchDetail = this.detail
      if (this.stateForm === 'trashed') {
        fetchDetail = this.trashed
      }

      fetchDetail({ id: this.id }).then((response) => {
        const { data } = response
        const keys = Object.keys(this.form)
        for (const i in keys) {
          const key = keys[i]
          this.form[key] = data[key]
        }
        this.loading = false
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
        this.loading = false
      })
    }

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
    // ...mapActions(`${this.collection}`, ['create', 'detail', 'update', 'patch', 'destroy']),
    ...mapMutations({
      formMutation: () => `${this.collection}/form`,
      collectionMutation: () => `${this.collection}/collection`,
      layoutMutation: () => `${this.collection}/layout`,
      validationMutation: () => `${this.collection}/validation`,
      dataMutation: () => `${this.collection}/data`,
      columnsMutation: () => `${this.collection}/columns`
    }),
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
    filterFn (val, update, abort) {
      update(() => {
        // const needle = val.toLowerCase()
        // this.options = genderOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    submit () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.loading = true
        this.create({ data: this.form }).then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            if (!this.submitAndCreate) {
              this.$router.push(`/${this.collection}`)
            } else {
              const keys = Object.keys(this.form)
              for (const i in keys) {
                const key = keys[i]
                this.form[key] = null
              }
            }
          }).finally(() => {
            this.loading = false
          })
        }).catch((error) => {
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
        }).finally(() => {
          this.loading = false
        })
      }
    },
    submitUpdate () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.loading = true
        const payload = {
          id: this.id,
          data: this.form
        }
        this.update(payload).then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            if (!this.submitAndCreate) {
              this.$router.push(`/${this.collection}`)
            }
          }).finally(() => {
            this.loading = false
          })
        }).catch((error) => {
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
        }).finally(() => {
          this.loading = false
        })
      }
    },
    confirmDelete (id) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure to delete?',
        ok: {
          label: 'Delete',
          color: 'negative',
          flat: true
        },
        cancel: {
          label: 'Cancel',
          color: 'white',
          textColor: 'black',
          flat: true
        },
        persistent: true
      }).onOk(() => {
        this.destroy({
          type: id,
          params: {}
        }).then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            this.$router.push(`/${this.collection}`)
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
          this.loading = false
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    confirmHardDelete (id) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure to delete?',
        ok: {
          label: 'Delete',
          color: 'negative',
          flat: true
        },
        cancel: {
          label: 'Cancel',
          color: 'white',
          textColor: 'black',
          flat: true
        },
        persistent: true
      }).onOk(() => {
        this.hardDelete({
          type: id,
          params: {}
        }).then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            this.$router.push(`/${this.collection}`)
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
          this.loading = false
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    confirmRestore (id) {
      this.$q.dialog({
        title: 'Restore',
        message: 'Are you sure to restore?',
        ok: {
          label: 'Restore',
          color: 'secondary',
          flat: true
        },
        cancel: {
          label: 'Cancel',
          color: 'white',
          textColor: 'black',
          flat: true
        },
        persistent: true
      }).onOk(() => {
        this.restore({
          type: id,
          params: {}
        }).then((response) => {
          const { status, message } = response
          this.$q.dialog({
            title: `${status}`,
            message: `${message}`,
            ok: {
              flat: true
            },
            persistent: true
          }).onOk(() => {
            this.$router.push(`/${this.collection}`)
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
          this.loading = false
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
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
    ...mapState({
      validation (state, getters) {
        return getters[`${this.collection}/validation`]
      },
      form (state, getters) {
        return getters[`${this.collection}/form`]
      },
      layout (state, getters) {
        return getters[`${this.collection}/layout`]
      }
    }),
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
