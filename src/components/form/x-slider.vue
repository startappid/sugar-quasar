<template>
  <q-slider v-model="standard" :min="0" :max="50"/>
</template>

<script>
export default {
  name: 'XSlider',
  data () {
    return {
      standard: 2
    }
  }
}
</script>
