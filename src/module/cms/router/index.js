import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
export default [{
    path: '/cms',
    component: Home,
    name: 'CMS内容管理',
    hidden: false,
    // ,
    // redirect: '/home',
    children: [
      {path: '/cms/page/list',
        component: page_list,
        name: '页面列表',
        hidden: false,}
    ]
  }/*,
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }*/
]
