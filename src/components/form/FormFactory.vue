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
      <q-btn icon="delete_forever" flat color="negative" label="Delete Forever" @click="confirmDelete(id)" />
      <q-btn icon="restore_from_trash" class="q-ml-md bg-primary text-white" color="secondary" label="Restore" @click="confirmRestore(id)" />
    </div>
  </div>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState, mapMutations } from 'vuex'
import {
  QInput
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
  data () {
    return {
      submitAndCreate: false,
      isPwd: true,
      loading: false,
      readonly: this.stateForm === 'show'
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
