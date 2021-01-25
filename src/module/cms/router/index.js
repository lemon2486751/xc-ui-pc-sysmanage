import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';
import page_edit from '@/module/cms/page/page_edit.vue';
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
        hidden: false,},
      {path: '/cms/page/add',
        component: page_add,
        name: '页面新增',
        hidden: true,},
      {path: '/cms/page/edit/:pageId',
        component: page_edit,
        name: '页面修改',
        hidden: true,}
    ]
  }/*,
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }*/
]
