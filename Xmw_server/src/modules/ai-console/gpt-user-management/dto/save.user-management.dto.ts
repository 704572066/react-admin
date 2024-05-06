/*
 * @Description: 保存用户数据 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-10 11:30:40
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:06:18
 */
import { ApiProperty } from '@nestjs/swagger';

import type { GPTUserStatus, OpenaiAccount } from '@/utils/types';
// import { Type } from 'class-transformer';

/**
 * @description: 保存用户数据
 * @author: 白雾茫茫丶
 */
export class SaveGPTUserManagementDto {

  @ApiProperty({
    type: String,
    description: 'ID',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'tmb',
  })
  lastLoginTmbId?: string;

  @ApiProperty({
    type: String,
    description: 'openaiAccount',
  })
  openaiAccount?: OpenaiAccount;

  @ApiProperty({
    type: String,
    description: 'inviterId',
  })
  inviterId?: string;

  @ApiProperty({
    type: String,
    description: 'openaiKey',
  })
  openaiKey?: string;  

  @ApiProperty({
    type: String,
    description: 'createTime',
  })
  createTime?: string;  

  @ApiProperty({
    type: String,
    description: 'timezone',
  })
  timezone?: string; 

  @ApiProperty({
    type: String,
    description: '状态',
    default: 'active',
  })
  status: string;

  @ApiProperty({
    type: Number,
    description: '比例',
  })
  promotionRate?: number;

  @ApiProperty({
    type: Number,
    description: 'phonePrefix',
  })
  phonePrefix?: number;

  @ApiProperty({
    type: Number,
    description: '版本',
  })
  version?: number;

  @ApiProperty({
    type: String,
    description: '用户名',
    default: 'root',
  })
  username: string;

  @ApiProperty({
    type: String,
    description: '电子邮箱',
    default: '843348394@qq.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    type: String,
    description: '电话号码',
    default: '13800138000',
  })
  phone?: string;

  @ApiProperty({
    type: String,
    description: '用户头像',
    default:
      'https://react.baiwumm.com/static/image/2023-01-13/5d7453ad-477c-47b9-be6e-212227710033.gif',
    required: false,
  })
  avatar?: string;

  @ApiProperty({
    type: String,
    description: '密码',
    default: 'v+M+IRi7oG0tn2sJGZUHRQ==',
    required: false,
  })
  password?: string;
}

/**
 * @description: 更新用户状态 Dto
 * @author: 白雾茫茫丶
 */
export class UpdateGPTUserStatusDto {
  @ApiProperty({
    type: String,
    description: '用户状态',
    default: 'active',
  })
  status: GPTUserStatus;
}
