<template>
  <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
    <div class="absolute-bottom bg-transparent">
      <q-avatar size="72px" class="q-mb-sm">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
      </q-avatar>
      <div class="text-weight-bold">{{name}}</div>
      <div>{{username}}</div>
    </div>
  </q-img>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MenuHeaderProfile',
  data () {
    return {
      user: null
    }
  },
  mounted () {

  },
  computed: {
    ...mapGetters({
      profile: 'auth/user'
    }),
    name () {
      return this.profile.first_name + ' ' + this.profile.last_name
    },
    username () {
      return this.profile.username
    }
  }
}
</script>
