import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// Import all of our components that we want to route
const HelloWorld = () => import('@/components/HelloWorld');
const Welcome = () => import('@/components/Welcome');
const AlgorithmManager = () => import('@/components/admin/AlgorithmManager');
const TagManager = () => import('@/components/admin/TagManager');

export default new Router({
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
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
});