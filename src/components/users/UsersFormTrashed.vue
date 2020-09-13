<template>
  <div class="q-pa-md shadow-1">
    <div class="text-h5">{{titlePage}} {{collectionName}}</div>
    <div class="row q-gutter-md q-my-md">
      <div class="col">
        <q-input
          filled
          v-model="form.first_name"
          :readonly="readonly"
          label="First Name"
          stack-label
          maxlength="50"
          clearable
          :error="this.$v.form.first_name.$error"
          />
      </div>
      <div class="col">
        <q-input
          filled
          bottom-slots
          v-model="form.last_name"
          :readonly="readonly"
          label="Last Name"
          stack-label
          maxlength="50"
          clearable
          :error="this.$v.form.last_name.$error"
          />
      </div>
    </div>

    <div class="row q-gutter-md q-my-md">
      <div class="col">
        <q-input
          filled
          bottom-slots
          v-model="form.username"
          :readonly="readonly"
          label="Username"
          stack-label
          maxlength="50"
          clearable
          :error="this.$v.form.username.$error"
          >
          <template v-slot:hint>
          ex: 62857000000
          </template>
        </q-input>
      </div>
      <div class="col">
        <q-input
          filled
          bottom-slots
          v-model="form.email"
          :readonly="readonly"
          type="email"
          label="Email"
          stack-label
          maxlength="50"
          clearable
          :error="this.$v.form.email.$error"
          >
          <template v-slot:hint>
          ex: budi@gmail.com
          </template>
        </q-input>
      </div>
    </div>

    <div class="row q-gutter-md q-my-md" v-if="stateForm=='create'">
      <div class="col">
        <q-input
          v-model="form.password"
          :readonly="readonly"
          filled :type="isPwd ? 'password' : 'text'"
          label="Password"
          stack-label
          hint="Password"
          :error="this.$v.form.password.$error"
          >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col">
        <q-input
          v-model="form.password_confirmation"
          :readonly="readonly"
          filled
          :type="isPwd ? 'password' : 'text'"
          label="Retype Password"
          stack-label
          hint="Retype Password"
          :error="this.$v.form.password_confirmation.$error"
          >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row q-gutter-md q-my-md">
      <div class="col">
        <q-input
          filled
          bottom-slots
          v-model="form.phone"
          :readonly="readonly"
          label="Phone number"
          stack-label
          maxlength="20"
          clearable
          :error="this.$v.form.phone.$error"
          >
          <template v-slot:hint>
          ex: 6281200000000
          </template>
        </q-input>
      </div>
      <div class="col">
        <q-select
          filled
          v-model="form.gender"
          :readonly="readonly"
          :options="options"
          emit-value
          map-options
          label="Gender"
          stack-label
          :error="this.$v.form.gender.$error"
          />
      </div>
    </div>

    <div class="row q-gutter-md q-my-md">
      <div class="col">
        <q-select
          filled
          v-model="form.role"
          :readonly="readonly"
          :options="roleOptions"
          emit-value
          map-options
          label="Role"
          stack-label
          :error="this.$v.form.role.$error"
          />
      </div>
      <div class="col">
        <q-toggle v-model="form.is_active" true-value="1" false-value="0" :readonly="readonly" label="Active" />
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
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
const genderOptions = [
  {
    label: 'Male',
    value: 1
  },
  {
    label: 'Female',
    value: 0
  }
]
const roleOptions = [
  {
    label: 'Admin',
    value: 'admin'
  },
  {
    label: 'Super Admin',
    value: 'superadmin'
  }
]
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
        username: null,
        email: null,
        password: null,
        password_confirmation: null,
        first_name: null,
        last_name: null,
        gender: null,
        phone: null,
        is_active: false,
        role: 'admin'
      },
      submitAndCreate: false,
      isPwd: true,
      options: genderOptions,
      roleOptions,
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
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          gender: data.gender,
          phone: data.phone,
          role: 'admin' // FIXME: hardcoded
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
    ...mapActions('users', {
      create: 'create',
      detail: 'trashed',
      update: 'update',
      patch: 'patch',
      destroy: 'hardDelete',
      restore: 'restore'
    }),
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = genderOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    submit () {
      this.$v.$touch()

      if (!this.$v.$error) {
        this.loading = true
        this.create(this.form).then((response) => {
          console.log(response)
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
      console.log(this.$v.$error)
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
        // console.log('>>>> OK')
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
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
        username: {
          required
        },
        email: {
          required,
          email
        },
        password: this.rulesPassword,
        password_confirmation: this.rulesPassword,
        first_name: {
          required
        },
        last_name: {
          required
        },
        gender: {
          required
        },
        phone: {
          required
        },
        role: {
          required
        }
      }
    }
  }
}
</script>
