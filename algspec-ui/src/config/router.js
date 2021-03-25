import Vue from 'vue';
import Router from 'vue-router';
import api from '@/config/api';
import store from '@/store';

Vue.use(Router);

// Import all of our components that we want to route
const Home                  = () => import('@/components/Home');
const Dashboard             = () => import('@/components/Dashboard');
const LoginRegisterControl  = () => import('@/components/LoginRegisterControl');
const Profile               = () => import('@/components/Profile');
const Settings              = () => import('@/components/Settings');
const Learn                 = () => import('@/components/Learn');
const Module                = () => import('@/components/Module');
const Practice              = () => import('@/components/Practice');
const Tag                   = () => import('@/components/Tag');

const ModuleManager         = () => import('@/components/admin/ModuleManager');
const CategoryManager       = () => import('@/components/admin/CategoryManager');
const LevelManager          = () => import('@/components/admin/LevelManager');

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/auth/:mode',
      name: 'LoginRegisterControl',
      component: LoginRegisterControl,
      props: true
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/learn',
      name: 'Learn',
      component: Learn
    },
    {
      path: '/module/:id',
      name: 'Module',
      component: Module,
      props: true,
    },
    {
      path: '/practice',
      name: 'Practice',
      component: Practice
    },
    {
      path: '/tag/:name',
      name: 'Tag',
      component: Tag,
      props: true
    },
    // Need to check for admin priviledges eventually...
    {
      path: '/admin/module_manager',
      name: 'ModuleManager',
      component: ModuleManager
    },
    {
      path: '/admin/category_manager',
      name: 'CategoryManager',
      component: CategoryManager
    },
    {
      path: '/admin/level_manager',
      name: 'LevelManager',
      component: LevelManager
    },
    // Default...should eventually have a 404 page?
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/', '/auth/login', '/auth/register'];
  const authRequired = !publicPages.includes(to.path);

  const user = (await api.get('user/me')).data.user;

  if (user) {

    // Assuming we are authenticated, set our user state to the most up to date version
    store.commit('auth/setUser', user);
    store.commit('auth/setIsAuthenticated' ,true);

    if (!authRequired) {
      return next('/dashboard');
    } else {
      return next();
    }

  } else {

    store.commit('auth/setUser', null);
    store.commit('auth/setIsAuthenticated', false);

    if (!authRequired) {
      return next();
    } else {
      store.dispatch('alert/error', { message: 'You must be authenticated to view this resource' });
      return next('/auth/login');
    }

  }

});

export default router;