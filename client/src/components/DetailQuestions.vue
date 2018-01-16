<template>
  <section id="detail">
    <v-layout row>
      <v-flex xs12>
        <v-card v-for="(item, index) in questions" :key="index">
          <v-card-actions>
            <v-flex xs1 class="text-xs-center">
              <v-btn color="grey" dark icon @click="questionDislike(item._id)"><v-icon>arrow_drop_down</v-icon></v-btn>
            </v-flex>
            <v-flex xs1 class="text-xs-center">
                <h3>{{item.upVote.length}}</h3>
            </v-flex>
            <v-flex xs1>
              <v-btn color="grey" dark icon @click="questionLike(item._id)"><v-icon>arrow_drop_up</v-icon></v-btn>
            </v-flex>
            <v-flex xs9>
              <h3 style="padding-left: 10px;">{{item.title}}</h3>
              <p style="padding-left: 10px; white-space: pre-wrap;">{{item.content}}</p>
            </v-flex>
          </v-card-actions>
        </v-card>
        <v-card style="margin-top:10px;">
          <v-card-actions>
            <v-flex xs12>
              <v-subheader><b>Answer</b></v-subheader>
              <v-divider ></v-divider>
            </v-flex>
          </v-card-actions>
          <v-card-text>
            <v-container>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  name="answer"
                  label="Give Answer"
                  id="answer"
                  v-model="comment"
                  type="text"
                  required
                  :rules="commentRules"
                >
                </v-text-field>
                <v-btn 
                  type="submit"
                  color="info"
                  :loading="loading"
                  @click.prevent="addAnswer(comment)"
                  :disabled="!valid"
                >Submit</v-btn>
                <v-btn type="submit" color="orange" dark @click="clear">Clear</v-btn>
              </v-form>
            </v-container>
            <v-divider ></v-divider>
          </v-card-text>
          <v-card-actions  v-for="(answer, index) in answers" :key="index">
            <v-flex xs1 class="text-xs-center">
              <v-btn color="grey" dark icon @click="answerDislike(answer._id)"><v-icon>arrow_drop_down</v-icon></v-btn>
            </v-flex>
            <v-flex xs1 class="text-xs-center">
                <h3>{{answer.upVote.length}}</h3>
            </v-flex>
            <v-flex xs1>
              <v-btn color="grey" dark icon @click="answerLike(answer._id)"><v-icon>arrow_drop_up</v-icon></v-btn>
            </v-flex>
            <v-flex xs8>
              <v-subheader><b>{{answer.userId.username}}</b></v-subheader>
              <p style="white-space: pre-wrap; padding-left:10px;">{{answer.comment}}</p>
            </v-flex>
            <v-flex xs1>
              <v-spacer></v-spacer>
              <v-btn icon color="red" dark @click="remove(answer._id)" v-show="show">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-flex>
            <v-divider ></v-divider>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      show: true,
      valid: true,
      comment: '',
      commentRules: [(v) => !!v || 'Username is required']
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.show = false
    }
    this.getAllQuestions()
    this.getAnswers()
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    questions () {
      return this.$store.getters.questions.filter(question => {
        return question._id === this.$route.params.id
      })
    },
    answers () {
      return this.$store.getters.answers.filter(answer => {
        return answer.questionId === this.$route.params.id
      })
    }
  },
  methods: {
    ...mapActions([
      'getAllQuestions',
      'getAnswers'
    ]),
    questionDislike (data) {
      this.$store.dispatch('questionsDownVote', data)
    },
    questionLike (data) {
      this.$store.dispatch('questionsUpVote', data)
    },
    listAnswer () {
      this.$store.dispatch('getAnswers')
    },
    answerDislike (data) {
      this.$store.dispatch('answerDownVote', data)
    },
    answerLike (data) {
      this.$store.dispatch('answerUpVote', data)
    },
    addAnswer (comment) {
      // console.log(data)
      this.$store.dispatch('createAnswer', {comment, questionId: this.$route.params.id})
      this.$refs.form.reset()
    },
    remove (data) {
      this.$store.dispatch('removeAnswer', data)
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>

</style>
