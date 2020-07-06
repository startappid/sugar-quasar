<template>
  <q-input filled v-model="date" mask="date" :rules="['date']">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'XDate',
  data () {
    return {
      date: '2019/02/01'
    }
  }
}
</script>
