import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

// Import all of our components that we want to route
const HelloWorld        = () => import('@/components/HelloWorld');
const Welcome           = () => import('@/components/Welcome');
const AlgorithmManager  = () => import('@/components/admin/AlgorithmManager');
const TagManager        = () => import('@/components/admin/TagManager');
const LevelManager      = () => import('@/components/admin/LevelManager');
const Algorithms        = () => import('@/components/Algorithms');
const Algorithm         = () => import('@/components/Algorithm');
const Tags              = () => import('@/components/Tags');
const Tag               = () => import('@/components/Tag');
const Login             = () => import('@/components/Login');
const Register          = () => import('@/components/Register');

// Get the necessary data from the store to use in navigation guards

const requireAuthenticated = (to, from, next) => {
  if (!(store.state.user.isAuthenticated)) {
    next({ name: 'Login', params: { 
      initAlertMessage: 'You must be authenticated to access this resource', 
      initAlertVariant: 'danger'
    }});
  } else {
    next();
  }
};

const checkAlreadyAuthenticated = (to, from, next) => {
  if (store.state.user.isAuthenticated) {
    next({ name: 'Welcome' });
  } else {
    next();
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      beforeEnter: requireAuthenticated,
      redirect: {
        name: 'Welcome'
      }
    },
    {
      path: '/welcome',
      beforeEnter: requireAuthenticated,
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/login',
      beforeEnter: checkAlreadyAuthenticated,
      name: 'Login',
      component: Login,
      props: true
    },
    {
      path: '/register',
      beforeEnter: checkAlreadyAuthenticated,
      name: 'Register',
      component: Register
    },
    {
      path: '/helloworld',
      beforeEnter: requireAuthenticated,
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/algorithms',
      beforeEnter: requireAuthenticated,
      name: 'Algorithms',
      component: Algorithms
    },
    {
      path: '/algorithm/:name',
      beforeEnter: requireAuthenticated,
      name: 'Algorithm',
      component: Algorithm,
      props: true,
    },
    {
      path: '/tags',
      beforeEnter: requireAuthenticated,
      name: 'Tags',
      component: Tags
    },
    {
      path: '/tag/:name',
      beforeEnter: requireAuthenticated,
      name: 'Tag',
      component: Tag,
      props: true
    },
    // Need to check for admin priviledges eventually...
    {
      path: '/admin/algorithm_manager',
      beforeEnter: requireAuthenticated,
      name: 'AlgorithmManager',
      component: AlgorithmManager
    },
    {
      path: '/admin/tag_manager',
      beforeEnter: requireAuthenticated,
      name: 'TagManager',
      component: TagManager
    },
    {
      path: '/admin/level_manager',
      beforeEnter: requireAuthenticated,
      name: 'LevelManager',
      component: LevelManager
    },
  ]
});