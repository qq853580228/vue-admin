import RouterView from '@/layout/routerView/index.vue';

const moduleName = 'account';

const routes = [
  {
    path: '/account',
    component: RouterView,
    redirect: '/account/settings',
    meta: {
      title: '个人中心',
      hideInMenu: true,
    },
    children: [
      {
        path: 'settings',
        name: `${moduleName}-settings`,
        component: () => import('@/views/account/settings.vue'),
        meta: { title: '个人中心', hideInMenu: true },
      },
      {
        path: 'about',
        name: `${moduleName}-about`,
        component: () => import('@/views/account/about.vue'),
        meta: { title: '关于', hideInMenu: true },
      },
    ],
  },
];

export default routes;
