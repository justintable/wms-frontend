import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/dashboard',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/dashboard/index.vue'),
          meta: { title: '首页', icon: 'House' }
        }
      ]
    },
    {
      path: '/product',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Product',
          component: () => import('../views/product/index.vue'),
          meta: { title: '商品管理', icon: 'Goods' }
        }
      ]
    },
    {
      path: '/inbound',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Inbound',
          component: () => import('../views/inbound/index.vue'),
          meta: { title: '入库管理', icon: 'Upload' }
        }
      ]
    },
    {
      path: '/outbound',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Outbound',
          component: () => import('../views/outbound/index.vue'),
          meta: { title: '出库管理', icon: 'Download' }
        }
      ]
    },
    {
      path: '/inventory',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Inventory',
          component: () => import('../views/inventory/index.vue'),
          meta: { title: '库存管理', icon: 'Box' }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/index.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 这里可以添加登录验证逻辑
  next()
})

export default router 