<template>
  <section>
    <v-layout row>
      <v-flex xs12>
        <v-text-field
        light
        solo
        v-model="search"
        prepend-icon="search"
        placeholder="Search Questions"
        style="width: 100%; min-width: 128px"
      ></v-text-field>
      <v-divider></v-divider>
        <v-subheader><b>Questions List</b></v-subheader>
        <v-divider ></v-divider>
        <div v-for="(item, index) in questions" :key="index">
          <v-flex xs12>
            <v-card style="margin-bottom:5px;">
              <v-card-actions>
                <v-flex xs1 md1 class="text-xs-center">
                  <h1>{{item.upVote.length}}</h1>
                  <p style="color:blue">Votes</p>
                </v-flex>
                <v-flex xs11 md10 style="padding-left: 10px;">
                  <a id="detail" @click="detailQuestion(item._id)">
                    <h1>{{item.title}}</h1>
                    <p>{{item.userId.username}}</p>
                  </a>
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

export default {
  name: 'hello',
  data () {
    return {
      search: ''
    }
  },
  created () {
    this.getAllQuestions()
  },
  computed: {
    questions () {
      // return this.$store.getters.questions
      return this.$store.getters.questions.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    ...mapActions([
      'getAllQuestions'
    ]),
    detailQuestion (data) {
      // console.log(data)
      this.$router.push(`/questions/detail/${data}`)
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
