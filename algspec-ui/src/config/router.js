import Vue from 'vue';
import Router from 'vue-router';
import api from '@/config/api';

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
const LoginRegisterControl = () => import('@/components/LoginRegisterControl')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Welcome'
      }
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/auth/:mode',
      name: 'LoginRegisterControl',
      component: LoginRegisterControl,
      props: true
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/algorithms',
      name: 'Algorithms',
      component: Algorithms
    },
    {
      path: '/algorithm/:name',
      name: 'Algorithm',
      component: Algorithm,
      props: true,
    },
    {
      path: '/tags',
      name: 'Tags',
      component: Tags
    },
    {
      path: '/tag/:name',
      name: 'Tag',
      component: Tag,
      props: true
    },
    // Need to check for admin priviledges eventually...
    {
      path: '/admin/algorithm_manager',
      name: 'AlgorithmManager',
      component: AlgorithmManager
    },
    {
      path: '/admin/tag_manager',
      name: 'TagManager',
      component: TagManager
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
  const publicPages = ['/auth/login', '/auth/register'];
  const authRequired = !publicPages.includes(to.path);
  const isAuthenticated = localStorage.getItem('user');

  if (authRequired) {
    if (!((await api.get('user/isAuthenticated')).data.isAuthenticated)) {
      localStorage.removeItem('user');
    }
    if (!isAuthenticated) {
      return next('/auth/login');
    }
  }

  next();
});

export default router;