import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// Import all of our components that we want to route
const HelloWorld        = () => import('@/components/HelloWorld');
const Welcome           = () => import('@/components/Welcome');
const AlgorithmManager  = () => import('@/components/admin/AlgorithmManager');
const TagManager        = () => import('@/components/admin/TagManager');
const Algorithms        = () => import('@/components/Algorithms');
const Algorithm         = () => import('@/components/Algorithm');
const Tags              = () => import('@/components/Tags');
const Tag               = () => import('@/components/Tag');

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
  ]
});