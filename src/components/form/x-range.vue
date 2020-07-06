<template>
  <q-range
    v-model="standard"
    color="secondary"
    :min="0"
    :max="50"
    disable
  />
</template>

<script>
export default {
  name: 'XRange',
  data () {
    return {
      standard: {
        min: 10,
        max: 35
      }
    }
  }
}
</script>
