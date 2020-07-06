<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$route.params.collection" icon="home" :to="`/${$route.params.collection}`" />
        <q-breadcrumbs-el label="Update" />
      </q-breadcrumbs>
      <q-toolbar-title></q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-md shadow-1">
      <div class="text-h5">Update {{$route.params.collection}}</div>
      <div class="row q-gutter-md q-my-md">
        <div class="col">
          <q-input filled bottom-slots label="Name" stack-label maxlength="20" value="Bali" >
            <template v-slot:hint>
            Country name
            </template>
          </q-input>
        </div>
      </div>
      <div class="row q-gutter-md q-my-md">
        <div class="col">
          <q-input filled bottom-slots label="ISO Code" stack-label maxlength="2" value="022 4942 111" >
            <template v-slot:hint>
            ex: ID for Indonesia
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-input filled bottom-slots label="Phone Code" stack-label maxlength="2" value="087382829830" >
            <template v-slot:hint>
            ex: 62 for Indonesia
            </template>
          </q-input>
        </div>
      </div>

      <div class="q-mt-xl q-mb-md row justify-between">
        <div>
          <q-btn flat label="Cancel" :to="`/${$route.params.collection}`" />
        </div>
        <div class=" justify-end">
          <q-btn icon="delete" flat color="negative" label="Delete" @click="confirmDelete($route.params.id)" />
          <q-btn icon="check" class="q-ml-md bg-primary text-white" color="secondary" label="Save" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  methods: {
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
    }
  }
}
</script>
