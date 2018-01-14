<template>
  <section id="signup">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  name="username"
                  label="Username"
                  id="username"
                  v-model="form.username"
                  type="text"
                  required
                  :rules="usernameRules"
                >
                </v-text-field>
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
                <v-text-field
                  name="confirmPassword"
                  label="Validate Password"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  :rules="[comparePasswords]">
                </v-text-field>
                <v-checkbox
                  label="Do you agree?"
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  required
                >
                </v-checkbox>
                <v-btn 
                  type="submit"
                  color="info"
                  :loading="loading"
                  @click.prevent="onSignup(form)"
                  :disabled="!valid"
                >SignUp</v-btn>
                <v-btn type="submit" color="orange" dark @click="clear">Clear</v-btn>
              </v-form>
            </v-container>
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
        username: '',
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
      usernameRules: [
        (v) => !!v || 'Username is required'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required'
      ]
    }
  },
  computed: {
    comparePasswords () {
      return this.form.password !== this.confirmPassword ? 'Passwords do not match.' : true
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSignup (data) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signUserUp', data)
        this.$router.push('/login')
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>

</style>
