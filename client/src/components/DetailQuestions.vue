<template>
  <section id="detail">
    <v-layout row>
      <v-flex xs12>
        <v-card v-for="(item, index) in questions" :key="index">
          <v-card-actions>
            <v-flex xs1 class="text-xs-center">
              <v-btn color="grey" dark icon><v-icon>arrow_drop_down</v-icon></v-btn>
            </v-flex>
            <v-flex xs1 class="text-xs-center">
                <h3>{{item.upVote.length}}</h3>
            </v-flex>
            <v-flex xs1>
              <v-btn color="grey" dark icon><v-icon>arrow_drop_up</v-icon></v-btn>
            </v-flex>
            <v-flex xs9>
              <h3 style="padding-left: 10px;">asdkjahskdjhasjd</h3>
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
                  v-model="form.comment"
                  type="text"
                  required
                  :rules="commentRules"
                >
                </v-text-field>
                <v-btn 
                  type="submit"
                  color="info"
                  :loading="loading"
                  @click.prevent="addAnswer(form)"
                  :disabled="!valid"
                >Submit</v-btn>
                <v-btn type="submit" color="orange" dark @click="clear">Clear</v-btn>
              </v-form>
            </v-container>
            <v-divider ></v-divider>
          </v-card-text>
          <v-card-actions  v-for="(answer, index) in answers" :key="index">
            <v-flex xs1 class="text-xs-center">
              <v-btn color="grey" dark icon><v-icon>arrow_drop_down</v-icon></v-btn>
            </v-flex>
            <v-flex xs1 class="text-xs-center">
                <h3>0</h3>
            </v-flex>
            <v-flex xs1>
              <v-btn color="grey" dark icon><v-icon>arrow_drop_up</v-icon></v-btn>
            </v-flex>
            <v-flex xs8>
              <v-subheader><b>{{answer.userId.username}}</b></v-subheader>
              <p style="white-space: pre-wrap;">
                {{answer.comment}}
              </p>
            </v-flex>
            <v-flex xs1>
              <v-spacer></v-spacer>
              <v-btn icon color="red" dark @click="remove(answer._id)">
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
      valid: true,
      form: {
        questionId: '',
        comment: ''
      },
      commentRules: [(v) => !!v || 'Username is required']
    }
  },
  created () {
    this.questionId = this.$route.params.id
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
      return this.$store.getters.answers
    }
  },
  methods: {
    ...mapActions([
      'getAllQuestions',
      'getAnswers'
    ]),
    listAnswer () {
      this.$store.dispatch('getAnswers')
    },
    addAnswer (data) {
      // console.log(data)
      this.$store.dispatch('createAnswer', data)
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
