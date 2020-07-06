<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$route.params.collection" icon="home" :to="`/${$route.params.collection}`" />
        <q-breadcrumbs-el label="Create" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-md shadow-1">
      <div class="text-h5">Create New {{$route.params.collection}}</div>
      <div class="row q-gutter-md q-my-md">
        <div class="col">
          <q-input filled bottom-slots v-model="text" label="Name" stack-label maxlength="20" clearable >
            <template v-slot:hint>
            Country name
            </template>
          </q-input>
        </div>
      </div>
      <div class="row q-gutter-md q-my-md">
        <div class="col">
          <q-input filled bottom-slots v-model="text" label="ISO Code" stack-label maxlength="2" clearable >
            <template v-slot:hint>
            ex: ID for Indonesia
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-input filled bottom-slots v-model="text" label="Phone Code" stack-label maxlength="2" clearable >
            <template v-slot:hint>
            ex: 62 for Indonesia
            </template>
          </q-input>
        </div>
      </div>

      <div class="row q-gutter-md q-my-md">
        <div class="col">
          <q-toggle v-model="dense" label="Submit and create new" />
        </div>
      </div>
      <div class="q-mt-xl q-mb-md row justify-end">
        <q-btn flat label="Cancel" :to="`/${$route.params.collection}`" />
        <q-btn icon="check" class="q-ml-md bg-primary text-white" color="secondary" label="Create" />
      </div>
    </div>
  </q-page>
</template>

<script>
const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]
export default {
  data () {
    const schema = this.$store.state[this.$route.params.collection].schema
    return {
      schema,

      text: '',
      ph: '',

      dense: false,
      password: '',
      isPwd: true,

      email: '',
      search: '',
      tel: '',
      url: '',
      time: '',
      date: '',
      model: null,
      options: stringOptions
    }
  },
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
