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

// import { Abilities } from '@/models/abilities.model';
// import { XmwMenu } from '@/models/xmw_menu.model'; // xmw_menu 实体
// import { XmwPermission } from '@/models/xmw_permission.model';
import { Token } from '@/models/token.model'; // xmw_role 实体
import { OperationLogsService } from '@/modules/system/operation-logs/operation-logs.service'; // OperationLogs Service
import { responseMessage } from '@/utils'; // 全局工具函数
import type {
  PageResponse,
  Response,
  // SessionTypes,
} from '@/utils/types';
import type { TokenStatus } from '@/utils/types/llm';

// import { MenuItem } from '@/utils/types/system';
import { ListTokenDto } from './dto';


// type permissionModel = {
//   role_id: string;
//   menu_id: string;
//   menu_check: number;
// };

@Injectable()
export class TokenService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(Token)
    private readonly tokenModel: typeof Token,

    // @InjectModel(Abilities)
    // private readonly abilitiesModel: typeof Abilities,

    // @InjectModel(XmwMenu)
    // private readonly menuModel: typeof XmwMenu,


    private sequelize: Sequelize,
    private readonly operationLogsService: OperationLogsService,
  ) {}

  /**
   * @description: 获取角色管理列表
   * @author: 白雾茫茫丶
   */
  async getTokenList(
    tokenInfo: ListTokenDto,
  ): Promise<Response<PageResponse<Token>>> {
    // 解构参数
    const {
      name,
      pageSize,
      current,
    } = tokenInfo;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (name) where.name = { [Op.substring]: name };
    // if (type) where.type = { [Op.eq]: type };
    // if (status) where.status = { [Op.eq]: status };
    // if (group) where.group = { [Op.eq]: group };
    // if (start_time && end_time)
    //   where.created_time = { [Op.between]: [start_time, end_time] };
    // where.menu_check = { [Op.eq]: 0 };
    // 分页查询数据
    const count = await this.tokenModel.count();
    const list = await this.tokenModel.findAll({
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
   * @description: 获取渠道
   * @author: 白雾茫茫丶
   */
  async getToken(
    id: number,
  ): Promise<Response<Token>> {
    
    // const count = await this.channelModel.count();
    const channel = await this.tokenModel.findByPk(id);
    return responseMessage(channel);
  }

  //   /**
  //  * @description: 获取分组
  //  * @author: guj
  //  */
  //   async getGroup(
  //   ): Promise<Response<any>> {
      
  //     // const count = await this.channelModel.count();
  //     const channel = await this.channelModel.findByPk(id);
  //     return responseMessage(channel);
  //   }

  /**
   * @description: 更新角色状态
   * @author: 白雾茫茫丶
   */
  async updateTokenStatus(
    id: number,
    status: TokenStatus,
  ): Promise<Response<number[]>> {
    // 执行 update 更新 xmw_role 状态
    const result = await this.tokenModel.update(
      { status },
      { where: { id } },
    );
    // 保存操作日志
    // 根据主键查找出当前数据
    const currentInfo = await this.tokenModel.findByPk(id);
    await this.operationLogsService.saveLogs(
      `更新渠道[${currentInfo.name}]状态：${
        { 0: '禁用', 1: '正常' }[status]
      }`,
    );
    return responseMessage(result);
  }


  /**
   * @description: 删除渠道
   * @author: guj
   */
  async deleteToken(id: number): Promise<Response<number>> {
    // 开始一个事务并将其保存到变量中
    const t = await this.sequelize.transaction();
    try {
      // 先删除 xmw_permission 表关联的数据
      // await this.abilitiesModel.destroy({
      //   where: { channel_id: id },
      //   transaction: t,
      // });
      // 根据主键查找出当前数据
      const currentInfo = await this.tokenModel.findByPk(id);
      // 再删除 xmw_role 关联的数据
      const result = await this.tokenModel.destroy({
        where: { id },
        transaction: t,
      });
      // 如果执行到此行,且没有引发任何错误,提交事务
      await t.commit();
      // 保存操作日志
      await this.operationLogsService.saveLogs(
        `删除渠道：${currentInfo.name}`,
      );
      return responseMessage(result);
    } catch (error) {
      // 如果执行到达此行,则抛出错误,回滚事务
      await t.rollback();
      return responseMessage({}, error, -1);
    }
  }

  /**
   * @description: 创建角色数据
   * @author: 白雾茫茫丶
   */
  // async createChannel(
  //   { menu_permission, ...channelInfo }: SaveChannelDto,
  
  // ): Promise<Response<SaveChannelDto>> {
  //   // 解构参数
  //   const { role_name, role_code } = channelInfo;
    
  //   // 开始一个事务并将其保存到变量中
  //   const t = await this.sequelize.transaction();
  //   try {
  //     // 执行 sql insert 语句,插入数据到 xmw_role 表中
  //     const result = await this.channelModel.create(
  //       { ...channelInfo },
  //       { transaction: t },
  //     );
  //     // 再把角色对应的权限插入到 xmw_permission 中
      
  //     await this.abilitiesModel.bulkCreate(permissionData, { transaction: t });
  //     // 如果执行到此行,且没有引发任何错误,提交事务
  //     await t.commit();
  //     // 保存操作日志
  //     await this.operationLogsService.saveLogs(`创建渠道：${result.name}`);
  //     return responseMessage(result);
  //   } catch (error) {
  //     // 如果执行到达此行,则抛出错误,回滚事务
  //     await t.rollback();
  //     return responseMessage({}, error, -1);
  //   }
  // }



}
