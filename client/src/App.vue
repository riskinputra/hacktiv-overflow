<template>
  <v-app id="app">
    <!-- <v-navigation-drawer class="hidden-md-and-up"></v-navigation-drawer> -->
    <header-navbar></header-navbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer id="footer" dark app class="pa-4">
      <p>&copy; Copyright 2018 - Riski N Putra</p>
    </v-footer>
  </v-app>
</template>

<script>
import HeaderNavbar from './components/HeaderNavbar'
export default {
  name: 'app',
  components: {
    'header-navbar': HeaderNavbar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Quicksand', sans-serif;
}
#footer {
  background: #232526;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  color: white;
  padding: 10px 0;
  font-weight: bold;
}
.footer {
  text-align: center;
}
</style>
