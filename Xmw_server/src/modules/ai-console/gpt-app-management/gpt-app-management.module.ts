/*
 * @Description: UserManagement Module
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-09 17:44:10
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:10:49
 */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PrismaModule } from 'src/npx/prisma/prisma.module';

import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { OperationLogsModule } from '@/modules/system/operation-logs/operation-logs.module'; // 系统设置-操作日志

import { GPTAppManagementController } from './gpt-app-management.controller'; // UserManagement Controller
import { AppManagementService } from './gpt-app-management.service'; // UserManagement Service

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [SequelizeModule.forFeature([XmwUser]), OperationLogsModule, PrismaModule],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [GPTAppManagementController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [AppManagementService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [AppManagementService],
})
export class GPTAppManagementModule {}
