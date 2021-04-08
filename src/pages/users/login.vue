<template>
  <q-page class="flex flex-center">
    <q-card
      square
      style="width: 400px; padding:50px"
    >
      <q-card-section>
        <div class="text-h6">
          {{ $t('auth.login.login') }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          outlined
          id="email"
          v-model.trim="model.email"
          type="email"
          :label="$t('auth.login.email')"
          :error="$v.model.email.$error"
          required
          autofocus
        />

        <q-input
          outlined
          id="password"
          v-model="model.password"
          type="password"
          :label="$t('auth.login.password')"
          :error="$v.model.password.$error"
          required
          @keyup.enter="login"
        />
        <q-checkbox
          id="rememberMe"
          v-model="rememberMe"
          :label="$t('auth.login.remember_me')"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn rounded
          color="secondary"
          class="full-width"
          :loading="loading"
          @click="submit"
        >
          {{ $t('auth.login.login') }}
        </q-btn>
      </q-card-actions>

      <router-link to="/forgot-password">
        <a>{{ $t('auth.login.password_forgot') }}</a>
      </router-link>

    </q-card>
  </q-page>
</template>

<script>
// import { required } from 'vuelidate/lib/validators'
// import { mapActions } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'Login',
  setup () {
    return {
      $v: useVuelidate()
    }
  },
  data: () => {
    return {
      model: {
        email: '',
        password: ''
      },
      rememberMe: false,
      loading: false
    }
  },
  methods: {
    // ...mapActions('auth', {
    //   login: 'login',
    //   remember: 'rememberMe'
    // }),
    // submit () {
    //   this.$v.$touch()
    //   if (!this.$v.$error) {
    //     this.loading = true
    //     if (this.rememberMe) this.remember()
    //     this.login(this.model).then((response) => {
    //       this.$router.push('/')
    //       this.$q.notify('You\'re logged in')
    //     }).catch((error) => {
    //       if (error.response) {
    //         if (error.response.status === 401) {
    //           this.$q.dialog({
    //             message: this.$t('auth.login.verification_required')
    //           })
    //         } else if (error.response.status === 403) {
    //           this.$q.dialog({
    //             message: this.$t('auth.login.invalid_credentials')
    //           })
    //         } else {
    //           console.error(error)
    //         }
    //       }
    //     }).finally(() => {
    //       this.loading = false
    //     })
    //   }
    // }
  },
  validations () {
    return {
      model: {
        email: {
          required
        },
        password: {
          required
        }
      }
    }
  }
}
</script>
