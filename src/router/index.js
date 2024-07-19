import { createRouter, createWebHistory } from 'vue-router'
import { checkAccessToken } from '@/axios/setupApi'

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/layouts/LayoutAuth.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/LoginPage.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/pages/RegisterPage.vue')
      },
    ]
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: () => import('@/pages/teacherPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)',
    name: 'error404',
    component: () => import('@/pages/404NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isToken = await checkAccessToken()
  if (to.meta.requiresAuth && !isToken) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
