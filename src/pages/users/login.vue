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
          id="username"
          v-model.trim="model.username"
          type="text"
          :label="this.$t('auth.login.username')"
          :error="this.$v.model.username.$error"
          required
          autofocus
        />
        <q-input
          id="password"
          v-model="model.password"
          type="password"
          :label="this.$t('auth.login.password')"
          :error="$v.model.password.$error"
          required
          @keyup.enter="login"
        /><br>
        <q-checkbox
          id="rememberMe"
          v-model="rememberMe"
          :label="this.$t('auth.login.remember_me')"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="primary"
          class="full-width"
          :loading="loading"
          @click="submit"
        >
          {{ $t('auth.login.login') }}
        </q-btn>
      </q-card-actions>
      <!--
      <router-link to="/user/forgot">
        <a>{{ $t('auth.login.password_forgot') }}</a>
      </router-link>
      -->
    </q-card>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
// import { createNamespacedHelpers } from 'vuex'
import { mapActions } from 'vuex'
// const { mapActions } = createNamespacedHelpers('auth')

export default {
  name: 'Login',
  data: () => {
    // const $auth = this.$store.state.auth
    // console.log($auth.login)
    return {
      model: {
        username: '',
        password: ''
      },
      rememberMe: false,
      loading: false
    }
  },
  methods: {
    ...mapActions('auth', {
      login: 'login',
      remember: 'rememberMe'
    }),
    submit () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.loading = true
        if (this.rememberMe) this.remember()
        this.login(this.model).then((response) => {
          this.$router.push('/')
          this.$q.notify('You\'re logged in')
        }).catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              this.$q.dialog({
                message: this.$t('auth.login.verification_required')
              })
            } else if (error.response.status === 403) {
              this.$q.dialog({
                message: this.$t('auth.login.invalid_credentials')
              })
            } else {
              console.error(error)
            }
          }
        }).finally(() => {
          this.loading = false
        })
      }
    }
  },
  validations: {
    model: {
      username: {
        required
      },
      password: {
        required
      }
    }
  }
}
</script>
