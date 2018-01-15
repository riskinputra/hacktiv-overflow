<template>
  <section id="signin">
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  name="email"
                  label="E-mail"
                  id="email"
                  v-model="form.email"
                  type="email"
                  :rules="emailRules"
                  required
                >
                </v-text-field>
                <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  :rules="passwordRules"
                >
                </v-text-field>
                <v-btn 
                  type="submit"
                  color="info"
                  :loading="loading"
                  @click.prevent="onSignin(form)"
                  :disabled="!valid"
                >SignUp</v-btn>
                <v-btn type="submit" color="orange" dark @click="clear">Clear</v-btn>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-text class="text-xs-center">
            Don't have an account? <router-link to="/signup">Sign Up</router-link>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      form: {
        email: '',
        password: ''
      },
      confirmPassword: '',
      checkbox: false,
      /* eslint-disable */
      emailRules: [
        (v) => !!v || 'E-mail is required',
        // eslint-disable-next-line 
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      /* eslint-enable */
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
      err: false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    error () {
      this.err = true
      return this.$store.getters.error
    }
  },
  methods: {
    onSignin (data) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signUserIn', data)
        this.$router.push('/')
      }
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>

</style>
