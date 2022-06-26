<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-card-text class>
          <v-row justify="center">
            <v-img src="login.png" contain max-width="250" max-height="250"></v-img>
          </v-row>
          <v-divider class="mb-8 mt-6"></v-divider>
          <form @submit.prevent="submit">
            <v-text-field
              prepend-icon="mdi-account"
              outlined
              v-model="email"
              :error-messages="$store.state.login.email.errors"
              label="Tên đăng nhập *"
            ></v-text-field>

            <v-text-field
              id="password"
              label="Mật khẩu *"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              name="password"
              v-model="password"
              prepend-icon="mdi-lock"
              :type="showPass ? 'text' : 'password'"
              :error-messages="$store.state.login.password.errors"
              outlined
              @click:append="showPass = !showPass"
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-btn color="primary" type="submit" :loading="$wait.is('logging')" block>Đăng nhập</v-btn>
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Cookie from 'js-cookie'
import APIs from '~/assets/configurations/API_Config'

export default {
  name: 'index',
  layout: 'login',
  head() {
    return {
      title: 'Đăng nhập'
    }
  },
  transition(to, from) {
    if (!from) {
      return 'slide-x-transition'
    }
    return 'slide-x-reverse-transition'
  },

  data: () => ({
    logging: false,
    showPass: false
  }),

  methods: {
    submit() {
      this.$wait.start('logging')
      setTimeout(() => {
        this.$store.dispatch('login/submit')
      }, 1000)
    }
  },

  computed: {
    email: {
      get() {
        return this.$store.state.login.email.value
      },
      set(value) {
        this.$store.dispatch('login/setUsername', value)
      }
    },
    password: {
      get() {
        return this.$store.state.login.password.value
      },
      set(value) {
        this.$store.dispatch('login/setPassword', value)
      }
    }
  }
}
</script>
