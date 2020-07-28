<template>
  <div class="q-pa-md shadow-1">
    <div class="text-h5">{{titlePage}} {{collectionName}}</div>
    <FormFactory
      :form="form"
      :layout="layout"
      :validation="validation"
      :readonly="readonly"
      :stateForm="stateForm"
    />

    <div class="row q-gutter-md q-my-md" v-if="stateForm=='create'">
      <div class="col">
        <q-toggle v-model="submitAndCreate" label="Submit and create new" />
      </div>
    </div>
    <div class="q-mt-xl q-mb-md row justify-end" v-if="stateForm=='create'">
      <q-btn flat label="Cancel" :to="`/${collection}`" />
      <q-btn
        icon="check"
        class="q-ml-md bg-primary text-white"
        color="secondary"
        label="Create"
        :loading="loading"
        @click="submit" />
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
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import FormFactory from 'components/form/FormFactory'

export default {
  name: 'UsersForm',
  components: {
    FormFactory
  },
  props: {
    collection: {
      type: String,
      default: () => ''
    },
    stateForm: {
      type: String,
      default: () => ''
    },
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      // form: {
      //   isocode: null,
      //   name: null,
      //   phonecode: null
      // },
      submitAndCreate: false,
      isPwd: true,
      loading: false,
      readonly: this.stateForm === 'show'
    }
  },
  mounted () {
    if (this.stateForm === 'show' || this.stateForm === 'update') {
      this.loading = true
      this.detail({ id: this.id }).then((response) => {
        const { data } = response
        this.form = {
          name: data.name,
          isocode: data.isocode,
          phonecode: data.phonecode
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
    ...mapActions('countries', ['create', 'detail', 'update', 'patch', 'destroy']),
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
    }
  },

  computed: {
    ...mapGetters('countries', ['validation', 'form', 'layout']),
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
