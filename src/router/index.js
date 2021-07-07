import Vue from 'vue'
import VueRouter from 'vue-router'

//Chat Rooms Section
import ChatRooms from '../views/chats-rooms/Rooms.vue'

//Login Section
import Login from '../views/login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: { name: 'chatRooms'}
  },
  {
    path: '/chat-rooms',
    name: 'chatRooms',
    component: ChatRooms
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
