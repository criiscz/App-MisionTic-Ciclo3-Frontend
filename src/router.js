import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Cart from "./views/Cart";
import Account from "./views/Account";
import MyOrders from "./views/AccountViews/MyOrders";
import Profile from "./views/AccountViews/Profile";

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
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
        children: [{
            path: 'profile',
            name: 'profile',
            component: Profile,
        }, {
            path: 'myorders',
            name: 'myorders',
            component: MyOrders
        }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
