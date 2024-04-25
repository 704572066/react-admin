/*
 * @Description: 系统设置模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-17 16:50:12
 */
export default {
  path: '/gpt',
  name: 'gpt',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/gpt',
      redirect: '/gpt/user-management',
      exact: true,
    },
    {
      path: '/gpt/user-management',
      name: 'user-management',
      component: './GPT/UserManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    // {
    //   path: '/system/menu-management',
    //   name: 'menu-management',
    //   component: './System/MenuManagement',
    //   access: 'adminRouteFilter',
    //   exact: true,
    // },
    // {
    //   path: '/system/role-management',
    //   name: 'role-management',
    //   component: './System/RoleManagement',
    //   access: 'adminRouteFilter',
    //   exact: true,
    // },
    // {
    //   path: '/system/internationalization',
    //   name: 'internationalization',
    //   component: './System/Internationalization',
    //   access: 'adminRouteFilter',
    //   exact: true,
    // },
    // {
    //   path: '/system/operation-log',
    //   name: 'operation-log',
    //   component: './System/OperationLog',
    //   access: 'adminRouteFilter',
    //   exact: true,
    // },
  ],
};
