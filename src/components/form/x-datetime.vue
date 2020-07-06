<template>
  <q-input filled v-model="date">
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date v-model="date" mask="YYYY-MM-DD HH:mm" />
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'XDatetime',
  data () {
    return {
      date: '2019-02-01 12:44'
    }
  }

}
</script>
