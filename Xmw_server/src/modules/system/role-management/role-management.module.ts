/*
 * @Description: RoleManagement Module
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:02:08
 */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { XmwMenu } from '@/models/xmw_menu.model'; // xmw_role 实体
import { XmwPermission } from '@/models/xmw_permission.model'; // xmw_permission 实体
import { XmwRole } from '@/models/xmw_role.model'; // xmw_role 实体
import { OperationLogsModule } from '@/modules/system/operation-logs/operation-logs.module'; // 系统设置-操作日志

import { RoleManagementController } from './role-management.controller'; // RoleManagement Controller
import { RoleManagementService } from './role-management.service'; // RoleManagement Service

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [
    SequelizeModule.forFeature([XmwRole, XmwPermission, XmwMenu]),
    OperationLogsModule,
  ],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [RoleManagementController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [RoleManagementService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [RoleManagementService],
})
export class RoleManagementModule {}
