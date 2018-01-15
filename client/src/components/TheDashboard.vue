<template>
  <section>
    <v-layout row>
      <v-flex xs12>
        <v-subheader><b>Questions List</b></v-subheader>
        <v-divider ></v-divider>
        <div v-for="(item, index) in questions" :key="index">
          <v-flex xs12>
            <v-card style="margin-bottom:5px;">
              <v-card-actions>
                  <v-flex xs1 class="text-xs-center">
                    <h1>{{item.upVote.length}}</h1>
                    <p style="color:blue">Votes</p>
                  </v-flex>
                  <v-flex xs10>
                    <a id="detail" @click="detailQuestion(item._id)">
                      <h1>{{item.title}}</h1>
                      <p>{{item.userId.username}}</p>
                    </a>
                  </v-flex>
                  <v-flex xs1>
                    <v-spacer></v-spacer>
                    <v-btn icon color="blue" dark>
                      <v-icon>mode_edit</v-icon>
                    </v-btn>
                    <v-btn icon color="red" dark>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-flex>
              </v-card-actions>
            </v-card>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import jwtDecode from 'jwt-decode'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      userId: ''
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.getAllQuestions()
      const token = localStorage.getItem('token')
      const decode = jwtDecode(token)
      const userId = decode.id
      console.log(userId)
      this.userId = userId
    }
  },
  computed: {
    questions () {
      return this.$store.getters.questions.filter(question => {
        return question.userId._id === this.userId
      })
    }
  },
  methods: {
    ...mapActions([
      'getAllQuestions'
    ]),
    detailQuestion (data) {
      // console.log(data)
      this.$router.push(`/questions/${data}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a#detail {
  color: black;
  text-decoration: none;
}
</style>
