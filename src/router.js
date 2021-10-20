import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Order from "./views/Order";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
