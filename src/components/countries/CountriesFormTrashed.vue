<template>
  <div class="q-pa-md shadow-1">
    <div class="text-h5">{{titlePage}} {{collectionName}}</div>
    <div class="row q-gutter-md q-my-md">
      <div class="col-2">
        <q-input
          filled
          v-model="form.isocode"
          :readonly="readonly"
          label="ISO Code"
          stack-label
          maxlength="2"
          clearable
          :error="this.$v.form.isocode.$error"
          />
      </div>
      <div class="col-6">
        <q-input
          filled
          v-model="form.name"
          :readonly="readonly"
          label="Country Name"
          stack-label
          maxlength="50"
          clearable
          :error="this.$v.form.name.$error"
          />
      </div>
      <div class="col">
        <q-input
          filled
          v-model="form.phonecode"
          :readonly="readonly"
          label="Phone Code"
          stack-label
          maxlength="3"
          clearable
          :error="this.$v.form.phonecode.$error"
          />
      </div>
    </div>

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
        <q-btn flat label="Cancel" :to="`/${collection}/trash`" />
      </div>
      <div class=" justify-end">
        <q-btn icon="delete_forever" flat color="negative" label="Delete Forever" @click="confirmDelete(id)" />
        <q-btn icon="restore_from_trash" class="q-ml-md bg-primary text-white" color="secondary" label="Restore" @click="confirmRestore(id)" />
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
import { mapActions } from 'vuex'

export default {
  name: 'UsersForm',
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
      form: {
        isocode: null,
        name: null,
        phonecode: null
      },
      submitAndCreate: false,
      isPwd: true,
      loading: false,
      readonly: this.stateForm === 'show'
    }
  },
  mounted () {
    if (this.stateForm === 'show' || this.stateForm === 'update') {
      this.loading = true
      this.detail(this.id).then((response) => {
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
    ...mapActions('countries', {
      create: 'create',
      detail: 'trashed',
      update: 'update',
      patch: 'patch',
      destroy: 'hardDelete',
      restore: 'restore'
    }),
    filterFn (val, update, abort) {
      update(() => {
        // const needle = val.toLowerCase()
        // this.options = genderOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    submit () {
      this.$v.$touch()
      console.log(this.$v.$error)
      if (!this.$v.$error) {
        this.loading = true
        this.create(this.form).then((response) => {
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
      form: {
        isocode: {
          required
        },
        name: {
          required
        },
        phonecode: {
          required
        }
      }
    }
  }
}
</script>
