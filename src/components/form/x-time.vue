<template>
  <q-input filled v-model="timeWithSeconds" mask="fulltime" :rules="['fulltime']">
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time
            v-model="timeWithSeconds"
            with-seconds
            format24h
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'XTime',
  data () {
    return {
      timeWithSeconds: '10:56:00'
    }
  }
}
</script>
