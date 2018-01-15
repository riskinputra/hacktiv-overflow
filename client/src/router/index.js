import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'
import AddQuestions from '@/components/AddQuestions'
import TheDashboard from '@/components/TheDashboard'
import DetailQuestions from '@/components/DetailQuestions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/add-questions',
      name: 'AddQuestions',
      component: AddQuestions
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: TheDashboard
    },
    {
      path: '/questions/:id',
      name: 'DetailQuestions',
      component: DetailQuestions
    }
  ]
})
