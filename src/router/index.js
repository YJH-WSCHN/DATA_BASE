import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/layout/Layout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Index.vue')
      },
      {
        path: 'events',
        name: 'Events',
        component: () => import('@/views/events/Index.vue'),
        redirect: '/events/list',
        children: [
          {
            path: 'list',
            name: 'EventList',
            component: () => import('@/views/events/List.vue')
          },
          {
            path: 'create',
            name: 'EventCreate',
            component: () => import('@/views/events/Form.vue')
          },
          {
            path: 'edit/:id',
            name: 'EventEdit',
            component: () => import('@/views/events/Form.vue'),
            props: true
          }
        ]
      },
      {
        path: 'tickets',
        name: 'Tickets',
        component: () => import('@/views/tickets/Index.vue'),
        redirect: '/tickets/list',
        children: [
          {
            path: 'list',
            name: 'TicketList',
            component: () => import('@/views/tickets/List.vue')
          },
          {
            path: 'create',
            name: 'TicketCreate',
            component: () => import('@/views/tickets/Form.vue')
          }
        ]
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/orders/Index.vue')
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/statistics/Index.vue')
      },
      {
        path: 'system',
        name: 'System',
        component: () => import('@/views/system/Index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router