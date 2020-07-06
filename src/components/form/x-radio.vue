<template>
  <q-radio v-model="shape" val="line" label="Line" />
</template>

<script>
export default {
  name: 'XRadio',
  data () {
    return {
      shape: 'line'
    }
  }
}
</script>
