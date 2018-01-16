<template>
  <section id="add-questions">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  name="title"
                  label="Title"
                  v-model="form.title"
                  type="text"
                  :rules="titleRules"
                  required
                >
                </v-text-field>
                <v-text-field
                  name="content"
                  label="Content"
                  id="content"
                  v-model="form.content"
                  type="content"
                  multi-line
                  required
                  :rules="contentRules"
                ></v-text-field>
                <v-btn 
                  type="submit"
                  color="info"
                  :loading="loading"
                  @click.prevent="addQuestions(form)"
                  :disabled="!valid"
                >Add</v-btn>
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
        title: '',
        content: ''
      },
      titleRules: [
        (v) => !!v || 'Title is required'
      ],
      contentRules: [
        (v) => !!v || 'Content is required'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    addQuestions (data) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('createQuestions', data)
        this.$router.push('/')
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
