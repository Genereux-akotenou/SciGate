import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Filesystem from '../views/Filesystem.vue';
import Resource from '../views/Resource.vue';
import Tasks from '../views/Tasks.vue';
import Profile from '../views/Profile.vue';
import Shell from '../views/Shell.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    { 
        path: '/filesystem', 
        name: 'Filesystem',
        component: Filesystem
    },
    { 
        path: '/resource', 
        name: 'Resource',
        component: Resource
    },
    { 
        path: '/tasks', 
        name: 'Tasks',
        component: Tasks
    },
    { 
        path: '/profile', 
        name: 'Profile',
        component: Profile
    },
    { 
        path: '/shell', 
        name: 'Shell',
        component: Shell
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router