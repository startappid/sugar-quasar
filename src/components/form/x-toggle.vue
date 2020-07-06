<template>
  <q-toggle
    v-model="value"
    label="On Right"
  />
</template>

<script>
export default {
  name: 'XToggle',
  data () {
    return {
      value: true
    }
  }
}
</script>
