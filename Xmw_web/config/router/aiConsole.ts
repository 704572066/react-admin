/*
 * @Description: 系统设置模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-17 16:50:12
 */
export default {
  path: '/ai-console',
  name: 'ai-console',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/ai-console',
      redirect: '/ai-console/gpt-user-management',
      exact: true,
    },
    {
      path: '/ai-console/gpt-user-management',
      name: 'gpt-user-management',
      component: './AIConsole/GPTUserManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/ai-console/gpt-app-management',
      name: 'gpt-app-management',
      component: './AIConsole/GPTAppManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/ai-console/gpt-dataset-management',
      name: 'gpt-dataset-management',
      component: './AIConsole/GPTDataSetManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
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
