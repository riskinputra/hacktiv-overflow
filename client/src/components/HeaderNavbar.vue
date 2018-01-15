<template>
  <div>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      :mini-variant="mini"
      dark
      absolute
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="../assets/user.png" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{username}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile xs12 v-for="item in menuItems" :key="item.title">
          <v-list-tile-content>
            <v-btn flat :to="item.route" style="width:100%">
              <v-icon style="margin-right: 10px">{{ item.icon }}</v-icon>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-btn >
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content xs12 v-show="show">
            <v-btn flat @click="logout" style="width:100%">
              <v-icon style="margin-right: 10px">lock</v-icon>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-btn >
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar id="navbar" class="gradient" dark>
      <v-toolbar-title id="title">H8 - Overflow</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down" style="padding-top:10px;">
        <div v-for="item in menuItems" :key="item.title">
          <v-btn flat :to="item.route"><v-icon>{{item.icon}}</v-icon>&nbsp;<b>{{item.title}}</b></v-btn>
        </div>
        <div>
          <v-btn flat @click="logout()" v-show="show"><v-icon>lock</v-icon>&nbsp;<b>Logout</b></v-btn>
        </div>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  data () {
    return {
      drawer: null,
      mini: false,
      right: null,
      show: false,
      username: ''
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      const decode = jwtDecode(token)
      const username = decode.username
      this.show = true
      this.username = username
    }
  },
  computed: {
    menuItems () {
      if (localStorage.getItem('token')) {
        let items = [
          { icon: 'home', title: 'Home', route: '/' },
          { icon: 'add_circle', title: 'Add Questions', route: '/add-questions' },
          { icon: 'dashboard', title: 'dashboard', route: '/dashboard' }
        ]
        return items
      } else {
        let items = [
          { icon: 'home', title: 'Home', route: '/' },
          { icon: 'face', title: 'Signup', route: '/signup' },
          { icon: 'lock_open', title: 'Signin', route: '/signin' }
        ]
        return items
      }
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      location.reload()
    }
  }
}
</script>

<style>
#title {
  font-family: 'Sofia', cursive;
  font-weight: bold;
}
.gradient {
  background: #fe8c00;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f83600, #fe8c00);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f83600, #fe8c00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
