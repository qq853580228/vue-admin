import RouterView from '@/layout/routerView/index.vue';

const moduleName = 'demos';

const routes = [
  {
    path: '/virtial-list',
    name: 'VirtualList',
    component: () => import('@/views/virtualList/index.vue'),
    meta: {
      title: '虚拟列表',
      icon: 'icon-twitter',
      keepAlive: true,
    },
    children: [],
  },
  {
    path: '/demos',
    name: moduleName,
    redirect: { name: `${moduleName}-custom-modal` },
    component: RouterView,
    meta: {
      title: 'routes.demo.demo',
      icon: 'icon-twitter',
    },
    children: [
      {
        path: 'nested-routes',
        name: `${moduleName}-nested-routes`,
        // redirect: { name: `${moduleName}-nested-routes-one` },
        meta: {
          title: '嵌套路由',
          icon: 'icon-twitter',
          keepAlive: true,
          hideChildrenInMenu: true,
          transitionName: false,
        },
        component: () =>
          import(/* webpackChunkName: "nested-routes" */ '@/views/demos/nested-routes/index.vue'),
        children: [
          {
            path: 'dynamic-route/:id',
            name: `${moduleName}-nested-dynamic-route`,
            meta: {
              title: '动态路由',
              icon: 'icon-twitter',
              hideInMenu: true,
              keepAlive: false,
              activeMenu: `${moduleName}-nested-routes`,
            },
            component: () => import('@/views/demos/nested-routes/route-one.vue'),
          },
          {
            path: 'dynamic-route/1',
            name: `${moduleName}-nested-dynamic-route-1`,
            meta: {
              title: '动态路由1',
              icon: 'icon-twitter',
              keepAlive: true,
            },
            component: () => import('@/views/demos/nested-routes/route-one.vue'),
          },
          {
            path: 'dynamic-route/2',
            name: `${moduleName}-nested-dynamic-route-2`,
            meta: {
              title: '动态路由2',
              icon: 'icon-twitter',
              keepAlive: true,
            },
            component: () => import('@/views/demos/nested-routes/route-one.vue'),
          },
          {
            path: 'route-one',
            name: `${moduleName}-nested-routes-one`,
            meta: {
              title: '路由一',
              icon: 'icon-twitter',
              hideInMenu: true,
              activeMenu: `${moduleName}-nested-routes`,
            },
            component: () => import('@/views/demos/nested-routes/route-one.vue'),
          },
          {
            path: 'route-two',
            name: `${moduleName}-nested-routes-two`,
            meta: {
              title: '路由二',
              icon: 'icon-twitter',
              hideInMenu: true,
              activeMenu: `${moduleName}-nested-routes`,
            },
            component: () => import('@/views/demos/nested-routes/route-two.vue'),
          },
          {
            path: 'route-three',
            name: `${moduleName}-nested-routes-three`,
            meta: {
              title: '路由三',
              icon: 'icon-twitter',
              hideInMenu: true,
              activeMenu: `${moduleName}-nested-routes`,
            },
            component: () => import('@/views/demos/nested-routes/route-three.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;
