<template>
  <section id="add-questions">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form v-model="valid" ref="form" lazy-validation >
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
                  @click.prevent="editQuestions(form)"
                  :disabled="!valid"
                >Edit</v-btn>
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
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      valid: true,
      form: {
        title: '',
        content: '',
        questionId: ''
      },
      titleRules: [
        (v) => !!v || 'Title is required'
      ],
      contentRules: [
        (v) => !!v || 'Content is required'
      ]
    }
  },
  created () {
    this.form.questionId = this.$route.params.id
    axios.get(`http://localhost:3000/api/questions/${this.$route.params.id}`)
      .then(result => {
        console.log('ini', result)
        this.form.title = result.data.data.title
        this.form.content = result.data.data.content
      })
      .catch(err => console.error(err))
  },
  computed: {
    ...mapState([
      'questionsById'
    ]),
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    ...mapActions([
      'getQuestionsById'
    ]),
    editQuestions (data) {
      console.log(data)
      this.$store.dispatch('updateQuestions', data)
      this.$router.push('/dashboard')
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>

</style>
