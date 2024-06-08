/*
 * @Description: UserManagement Service
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-09 17:44:15
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-12 09:21:47
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/npx/prisma/prisma.service';

import { OperationLogsService } from '@/modules/system/operation-logs/operation-logs.service'; // OperationLogs Service
import { responseMessage } from '@/utils'; // 全局工具函数
import type {
  Response,
} from '@/utils/types';

@Injectable()
export class RegisterService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    private readonly operationLogsService: OperationLogsService,
    private readonly prismaService: PrismaService
  ) {
    // prisma = new PrismaClient();
  }

  /**
   * @description: 获取配置数据
   * @author: guj
   */
  async getConfig(
  ): Promise<Response<any>> {
    const where = {
      type: 'fastgpt'
    };
    let config = await this.prismaService.systemconfigs.findFirst({where});

    if(!config){
      config = await this.prismaService.systemconfigs.create({
        data:{
          type: 'fastgpt',
          value: {},
          // createTime: new Date()
        }
      });
    }
   
    return responseMessage(config);
  }

  /**
   * @description: 更新配置数据
   * @author: guj
   */
  async updateConfig(
    id: string,
    config: object,
  ): Promise<Response<number[]>> {
    // 解构参数
    
    // 如果通过则执行 sql save 语句
    const result = await this.prismaService.systemconfigs.update({
      where: { id },
      data:{value:config}
    });
    // 更新 session 用户信息
    // session.currentUserInfo = { ...session.currentUserInfo, ...userInfo };
    // 保存操作日志
    // 根据主键查找出当前数据
    // const currentInfo = await this.userModel.findByPk(user_id);
    // await this.operationLogsService.saveLogs(
    //   `编辑用户：${result.username}`,
    // );
    return responseMessage(result);
  }

 
}
