<template>
  <v-toolbar id="navbar" class="gradient" dark>
    <v-toolbar-title id="title">H8 - Overflow</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down" v-for="item in menuItems" :key="item.title">
      <v-btn flat :to="item.route"><v-icon>{{item.icon}}</v-icon>&nbsp;<b>{{item.title}}</b></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    menuItems () {
      let items = [
        { icon: 'home', title: 'Home', route: '/' },
        { icon: 'face', title: 'Signup', route: '/signup' },
        { icon: 'lock_open', title: 'Signin', route: '/signin' },
        { icon: 'lock', title: 'Logout', route: '/logout' }
      ]
      return items
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
