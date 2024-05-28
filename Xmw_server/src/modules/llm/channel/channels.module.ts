/*
 * @Description: RoleManagement Module
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:02:08
 */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AxiosRequestConfig } from 'axios';

import { Abilities } from '@/models/abilities.model';
// import { XmwMenu } from '@/models/xmw_menu.model'; // xmw_role 实体
// import { XmwPermission } from '@/models/xmw_permission.model'; // xmw_permission 实体
import { Channels } from '@/models/channels.model'; // Channel 实体
// import { AxiosModule } from '@/modules/llm/axios.module'; // 系统设置-操作日志
import { OperationLogsModule } from '@/modules/system/operation-logs/operation-logs.module'; // 系统设置-操作日志

import { ChannelController } from './channels.controller'; // RoleManagement Controller
import { ChannelsService } from './channels.service'; // RoleManagement Service
@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [
    SequelizeModule.forFeature([Channels, Abilities]),
    OperationLogsModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<AxiosRequestConfig> => ({
        baseURL: configService.get<string>('ONEAPI_BASE_URL'),
        timeout: 5000, // 请求超时时间
        headers: {
            Authorization: `Bearer ${configService.get<string>('TOKEN')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [ChannelController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [ChannelsService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [ChannelsService],
})
export class ChannelsModule {}
