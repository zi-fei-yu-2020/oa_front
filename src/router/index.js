import { createRouter, createWebHashHistory } from 'vue-router'
import login from "@/views/login/login.vue"
import Index from "@/views/main/index.vue"
import Admin from "@/layout/admin.vue"
import NotFound from "@/views/404.vue";
import UserAdd from "@/views/staff/add.vue"
import UserList from "@/views/staff/list.vue"
import InfoPublish from "@/views/inform/publish.vue"
import InfoList from "@/views/inform/list.vue"
import InfoDetail from "@/views/inform/detail.vue"
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Admin,
      name: 'admin',
      children: [{
        path: "/",
        component: Index,
        name: "后台首页",
      },
      {
        path: "/manage/user_add",
        component: UserAdd,
        name: "新增员工",
      },
      {
        path: "/manage/user_list",
        component: UserList,
        name: "员工列表",
      },
      {
        path: "/inform/publish",
        component: InfoPublish,
        name: "发布通知",
      },
      {
        path: "/inform/list",
        component: InfoList,
        name: "通知列表",
      },
      {
        path: "/inform/detail/:pk",
        component: InfoDetail,
        name: "通知详情",
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
      name: 'NotFound'
    },
  ]
})

router.beforeEach((to, from) => {
  //判断用户是否登录，如果没有，并且访问的页面不是登录页面，就让跳转到登录页面
  const authStore = useAuthStore()
  if (!authStore.is_logined && to.name != 'login') {
    return { name: "login" }
  }
})

export default router
