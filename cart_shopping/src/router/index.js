import { createRouter, createWebHistory } from 'vue-router';

export const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/views/shop/index.vue'),
    hidden: true,
  },
  ,
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart/index.vue'),
    hidden: true,
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/account/index.vue'),
    hidden: true,
  },
  ,
  {
    path: '/club',
    name: 'club',
    component: () => import('@/views/club/index.vue'),
    hidden: true,
  }  ,
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/orders/index.vue'),
    hidden: true,
  }
];

const createNewRouter = () =>
  createRouter({
    routes: constantRoutes,
    history: createWebHistory(),
    scrollBehavior: () => ({ y: 0 }),
  });

const router = createNewRouter();
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createNewRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
