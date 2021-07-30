<template>
  <q-page class="q-pa-md scrolltop">
    <q-ajax-bar
      ref="loadingbar"
      position="top"
      skip-hijack
    />
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$t(`${collection}.index.title`)" :to="`/${collection}`" />
        <q-breadcrumbs-el label="Create" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>
    <div class="text-h5">{{$t(`${collection}.create.title`)}}</div>

    <FormGenerator
      ref="formGenerator"
      :collection="collection"
      :stateForm="stateForm"
      :layout="layout"
      :validation="validation"
    />

    <q-footer reveal elevated class="bg-white text-black">
      <q-toolbar style="height: 64px">
        <q-toggle v-model="submitAndCreate" label="Submit and create new" />
        <q-space />
        <q-btn flat label="Cancel" :to="`/${collection}`" />
        <q-btn
          icon="check"
          class="q-ml-md bg-primary text-white"
          color="secondary"
          label="Create"
          :loading="loading"
          @click="submit"
        />
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import FormGenerator from 'components/form/FormGenerator'
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll

export default {
  components: {
    FormGenerator
  },
  props: {
    collection: {
      type: String,
      default: null
    }
  },
  setup (props) {

  },
  provide () {
    return {
      form: this.form
    }
  },
  mounted () {

  },
  data () {
    return {
      stateForm: 'create', // create, update, show
      isPwd: true,
      loading: false,
      submitAndCreate: false
    }
  },
  methods: {
    submit () {
      const { formGenerator } = this.$refs
      if (formGenerator.validateError()) {
        const $v = formGenerator.getValidation()
        const el = this.$el.querySelector(`.form-${$v.$errors[0].$property}`)
        const target = getScrollTarget(el)
        const offset = el.offsetTop
        const duration = 500
        setVerticalScrollPosition(target, offset, duration)
        return
      }

      const { loadingbar } = this.$refs
      loadingbar.start()
      this.loading = true

      const payload = {
        data: formGenerator.form
      }

      this.$store
      .dispatch(`${this.collection}/create`, payload)
      .then((response) => {
        const { status } = response
        if (this.submitAndCreate) {
          this.$q.notify('Data created')
          const keys = Object.keys(this.form)
          for (const i in keys) {
            const key = keys[i]
            this.form[key] = null
          }
          this.$refs.formGenerator.resetForm()
          return
        }

        this.$q.dialog({
          title: `${status}`,
          message: 'Data created',
          ok: {
            flat: true
          },
          persistent: true
        }).onOk(() => {
          this.$router.push(`/${this.collection}`)
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
        loadingbar.stop()
        this.loading = false
      })
    },
  },
  computed: {
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
    readonly () {
      return this.stateForm === 'show'
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
  }
}
</script>
