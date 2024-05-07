/*
 * @Description: UserManagement Service
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-09 17:44:15
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-12 09:21:47
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PrismaClient } from '@prisma/client';
import * as dayjs from 'dayjs';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { PrismaService } from 'src/npx/prisma/prisma.service';

import { User } from '@/models/mongodb/schema';
// import { XmwJobs } from '@/models/xmw_jobs.model';
// import { XmwOrganization } from '@/models/xmw_organization.model';
// import { XmwRole } from '@/models/xmw_role.model';
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { OperationLogsService } from '@/modules/system/operation-logs/operation-logs.service'; // OperationLogs Service
import { formatPrice, hashStr, responseMessage } from '@/utils'; // 全局工具函数
import { TeamMemberRoleEnum, TeamMemberStatusEnum } from '@/utils/enums'; // 全局工具函数
import type {
  GPTUserStatus,
  PageResponse,
  Response,
  SessionTypes,
  Status,
} from '@/utils/types';

import { ListUserManagementDto, SaveGPTUserManagementDto } from './dto';

@Injectable()
export class UserManagementService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwUser)
    private readonly userModel: typeof XmwUser,
    private readonly operationLogsService: OperationLogsService,
    private readonly prismaService: PrismaService
  ) {
    // prisma = new PrismaClient();
  }

  /**
   * @description: 获取用户管理列表
   * @author: 白雾茫茫丶
   */
  async getUserList(
    userInfo: ListUserManagementDto,
  ): Promise<Response<PageResponse<any>>> {
    // 解构参数
    // const { user_name, sex, status, start_time, end_time, pageSize, current } =
    //   userInfo;
    // 拼接查询参数
    // const where: WhereOptions = {};
    // if (user_name) where.user_name = { [Op.substring]: user_name };
    // if (sex) where.sex = { [Op.eq]: sex };
    // if (status) where.status = { [Op.eq]: status };
    // if (start_time && end_time)
    //   where.created_time = { [Op.between]: [start_time, end_time] };
    // const prisma = new PrismaClient();
    const start = 0;
    const end = 20;
    // const lim = end-start;
    // const order = 1;
    const sort = 'createTime';
    const username = '';
    const where = {
      username: username
    };

    const usersRaw = await this.prismaService.users.findMany({skip:start, take:end-start,orderBy:{
      [sort] :"asc" 
    }})
      // .skip(start)
      // .limit(end - start)
      // .sort({ [sort]: order });

    const users = usersRaw.map((user) => {
      // const obj = user.toObject();
      return {
        ...user,
        // id: user._id,
        // balance: formatPrice(user.balance),
        createTime: dayjs(user.createTime).format('YYYY/MM/DD HH:mm'),
        password: ''
      };
    });

    const totalCount = await this.prismaService.users.count();

    // res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    // res.header('X-Total-Count', totalCount);
    // res.json(users);



    // 分页查询数据
    // const { count, rows } = await this.userModel.findAndCountAll({
    //   attributes: {
    //     include: ['j.jobs_name', 'o.org_name', 'r.role_name'],
    //   },
    //   // 联表查询
    //   include: [
    //     {
    //       model: XmwJobs,
    //       as: 'j',
    //       attributes: [],
    //     },
    //     {
    //       model: XmwOrganization,
    //       as: 'o',
    //       attributes: [],
    //     },
    //     {
    //       model: XmwRole,
    //       as: 'r',
    //       attributes: [],
    //     },
    //   ],
    //   raw: true,
    //   offset: (Number(current) - 1) * pageSize,
    //   limit: Number(pageSize),
    //   where,
    //   order: [['sort', 'desc']], // 排序规则,
    //   distinct: true,
    // });
    return responseMessage({ list: users, total: totalCount });
  }

  /**
   * @description: 创建GPT用户数据
   * @author: 白雾茫茫丶
   */
  async createGPTUser(
    userInfo: SaveGPTUserManagementDto,
    // session: SessionTypes,
  ): Promise<Response<any>> {
    // 解构参数
    const { phone, password } = userInfo;
    const where = {
      username: phone
    };
    const user = await this.prismaService.users.findFirst({where});

    if(user){
      return responseMessage({}, '用户名手机号码已存在!', -1);
    }
    
    // const [result, created] = await this.userModel.findOrCreate({
    //   // 用户名称和用户工号、手机号码不能相同
    //   where: { [Op.or]: { user_name, work_no, phone } },
    //   // 如果不存在则插入数据
    //   defaults: {
    //     ...userInfo,
    //     founder: session?.currentUserInfo?.user_id,
    //   },
    // });
    let newUser = null;
    await this.prismaService.$transaction(async (tx) => {
      // 1. Decrement amount from the sender.
      newUser = await tx.users.create({
        data:{
          username:phone, 
          password:hashStr(password)
        },
      });
      const where = {
        userId: newUser.id,
        defaultTeam: true
      };
      const tmb = await tx.teamMembers.findFirst({where});
    
      if (!tmb) {
        // create
        const newTeam = await tx.teams.create(
          {
            data:{
              ownerId: newUser.id,
              name: 'My Team',
              avatar: '/icon/logo.svg',
              balance: 99990000
              // createTime: new Date()
            }
          }
        );
        await tx.teamMembers.create(
          {
            data:{
              teamId: newTeam.id,
              userId: newUser.id,
              name: 'Owner',
              role: TeamMemberRoleEnum.owner,
              status: TeamMemberStatusEnum.active,
              // createTime: new Date(),
              defaultTeam: true
            }
          }
        );
        await this.operationLogsService.saveLogs(`创建用户：${newUser.username}`);
        
        // console.log('create default team', newUser.id);
      } else {
        await this.operationLogsService.saveLogs(`默认团队已存在：${tmb.teamId}`);
        // console.log('default team exist', newUser.id);
        // await tx.teams.findByIdAndUpdate(tmb.teamId, {
        //   $set: {
        //     ...(balance !== undefined && { balance })
        //   }
        // });
      }
      
      // 2. Verify that the sender's balance didn't go below zero.
      // if (sender.balance < 0) {
      //   throw new Error(`${from} doesn't have enough to send ${amount}`)
      // }
  
      // 3. Increment the recipient's balance by amount
      // const recipient = await tx.account.update({
      //   data: {
      //     balance: {
      //       increment: amount,
      //     },
      //   },
      //   where: {
      //     email: to,
      //   },
      // })
  
      // return recipient
    })
    return responseMessage(newUser);
    // const [posts, totalPosts] = await this.prismaService.$transaction([
    //   this.prismaService.users.create({ where: { title: { contains: 'prisma' } } }),
    //   prisma.post.count(),
    // ])
    // await this.prismaService.users.create

    // 判断是否创建
    
    // 保存操作日志
    // await this.operationLogsService.saveLogs(`创建用户：${newUser.}`);
    // return responseMessage(result);
    
  }

  /**
   * @description: 更新用户数据
   * @author: 白雾茫茫丶
   */
  async updateGPTUser(
    id: string,
    userInfo: SaveGPTUserManagementDto,
    session: SessionTypes,
  ): Promise<Response<number[]>> {
    // 解构参数
    const { username, password, status } = userInfo;
    if (username) {
      // 用户名称和用户工号、手机号码不能相同
      const exist = await this.prismaService.users.findFirst({
        where: {
          username,
          id: { not: id}
        }
      });
      // 如果有结果，则证明已存在，这里存在两种情况，
      if (exist) {
        return responseMessage({}, '用户名手机号码已存在!', -1);
      }
    }
    let data = {}
    if(password)
      data = { username, status, password : hashStr(password) }
    else
      data = { username, status }
    // 如果通过则执行 sql save 语句
    const result = await this.prismaService.users.update({
      where: { id },
      data
    });
    // 更新 session 用户信息
    // session.currentUserInfo = { ...session.currentUserInfo, ...userInfo };
    // 保存操作日志
    // 根据主键查找出当前数据
    // const currentInfo = await this.userModel.findByPk(user_id);
    await this.operationLogsService.saveLogs(
      `编辑用户：${result.username}`,
    );
    return responseMessage(result);
  }

  /**
   * @description: 删除角色数据
   * @author: 白雾茫茫丶
   */
  async deleteUser(user_id: string): Promise<Response<number>> {
    // 超级管理员不能删除，即 admin 用户
    const exist = await this.userModel.findOne({
      where: { user_name: 'admin', user_id },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return responseMessage({}, 'admin 用户为超级管理员，不能删除!', -1);
    }
    // 根据主键查找出当前数据
    const currentInfo = await this.userModel.findByPk(user_id);
    // 如果通过则执行 sql delete 语句
    const result = await this.userModel.destroy({ where: { user_id } });
    // 保存操作日志
    await this.operationLogsService.saveLogs(
      `删除用户：${currentInfo.user_name}`,
    );
    return responseMessage(result);
  }

  /**
   * @description: 更新用户状态
   * @author: 白雾茫茫丶
   */
  async updateGPTUserStatus(
    id: string,
    status: GPTUserStatus,
  ): Promise<Response<number[]>> {
    // 执行 update 更新 xmw_role 状态
    const result = await this.prismaService.users.update(
      { 
        where: { id:id },
        data:{ status:status }
      }
    );
    // 保存操作日志
    // 根据主键查找出当前数据
    // const currentInfo = await this.prismaService.users.findFirst({where:{id}});
    await this.operationLogsService.saveLogs(
      `更新用户[${result.username}]状态：${
        { 0: '禁用', 1: '正常' }[status]
      }`,
    );
    return responseMessage(result);
  }
}
