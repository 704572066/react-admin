/*
 * @Description: RoleManagement Service
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-28 17:39:28
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:26:15
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { Sequelize } from 'sequelize-typescript';

// import { XmwMenu } from '@/models/xmw_menu.model'; // xmw_menu 实体
// import { XmwPermission } from '@/models/xmw_permission.model';
import { Channels } from '@/models/channels.model'; // xmw_role 实体
import { OperationLogsService } from '@/modules/system/operation-logs/operation-logs.service'; // OperationLogs Service
import { responseMessage } from '@/utils'; // 全局工具函数
import type {
  PageResponse,
  Response,
  // SessionTypes,
} from '@/utils/types';
import type { ChannelStatus } from '@/utils/types/llm';

// import { MenuItem } from '@/utils/types/system';
import { ListChannelsDto } from './dto';


// type permissionModel = {
//   role_id: string;
//   menu_id: string;
//   menu_check: number;
// };

@Injectable()
export class ChannelsService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(Channels)
    private readonly channelModel: typeof Channels,

    // @InjectModel(XmwPermission)
    // private readonly permissionModel: typeof XmwPermission,

    // @InjectModel(XmwMenu)
    // private readonly menuModel: typeof XmwMenu,


    private sequelize: Sequelize,
    private readonly operationLogsService: OperationLogsService,
  ) {}

  /**
   * @description: 获取角色管理列表
   * @author: 白雾茫茫丶
   */
  async getChannelList(
    roleInfo: ListChannelsDto,
  ): Promise<Response<PageResponse<Channels>>> {
    // 解构参数
    const {
      role_name,
      role_code,
      status,
      start_time,
      end_time,
      pageSize,
      current,
    } = roleInfo;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (role_name) where.role_name = { [Op.substring]: role_name };
    if (role_code) where.role_code = { [Op.substring]: role_code };
    if (status) where.status = { [Op.eq]: status };
    if (start_time && end_time)
      where.created_time = { [Op.between]: [start_time, end_time] };
    // where.menu_check = { [Op.eq]: 0 };
    // 分页查询数据
    const count = await this.channelModel.count();
    const list = await this.channelModel.findAll({
      // 联表查询
      // include: [
      //   {
      //     model: XmwPermission,
      //     as: 'menu_permission',
      //     where: {
      //       menu_check: 0
      //     }
      //   },
      // ],
      offset: (Number(current) - 1) * pageSize,
      limit: Number(pageSize),
      where,
      // order: [
      //   ['sort', 'desc'],
      //   ['created_time', 'desc'],
      // ], // 排序规则,
    });
    return responseMessage({ list, total: count });
  }

  /**
   * @description: 更新角色状态
   * @author: 白雾茫茫丶
   */
  async updateChannelStatus(
    id: number,
    status: ChannelStatus,
  ): Promise<Response<number[]>> {
    // 执行 update 更新 xmw_role 状态
    const result = await this.channelModel.update(
      { status },
      { where: { id } },
    );
    // 保存操作日志
    // 根据主键查找出当前数据
    const currentInfo = await this.channelModel.findByPk(id);
    await this.operationLogsService.saveLogs(
      `更新渠道[${currentInfo.name}]状态：${
        { 0: '禁用', 1: '正常' }[status]
      }`,
    );
    return responseMessage(result);
  }

  /**
   * @description: 更新角色状态
   * @author: 白雾茫茫丶
   */
  async updateChannelWeight(
    id: number,
    weight: number,
  ): Promise<Response<number[]>> {
    // 执行 update 更新 xmw_role 状态
    const result = await this.channelModel.update(
      { weight },
      { where: { id } },
    );
    // 保存操作日志
    // 根据主键查找出当前数据
    const currentInfo = await this.channelModel.findByPk(id);
    await this.operationLogsService.saveLogs(
      `更新渠道[${currentInfo.name}]权重：${currentInfo.weight
      }`,
    );
    return responseMessage(result);
  }

  /**
   * @description: 更新渠道优先级
   * @author: guj
   */
  async updateChannelPriority(
    id: number,
    priority: number,
  ): Promise<Response<number[]>> {
    // 执行 update 更新 xmw_role 状态
    const result = await this.channelModel.update(
      { priority },
      { where: { id } },
    );
    // 保存操作日志
    // 根据主键查找出当前数据
    const currentInfo = await this.channelModel.findByPk(id);
    await this.operationLogsService.saveLogs(
      `更新渠道[${currentInfo.name}]权重：${currentInfo.priority
      }`,
    );
    return responseMessage(result);
  }


}
