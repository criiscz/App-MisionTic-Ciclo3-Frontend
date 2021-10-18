import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Cart from "./views/Cart";

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
        path: '/cart',
        name: 'cart',
        component: Cart
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
