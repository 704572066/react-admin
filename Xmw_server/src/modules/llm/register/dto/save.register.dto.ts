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
export class UpdateRegisterDto {

  @ApiProperty({
    type: String,
    description: 'ID',
  })
  id: string;

  @ApiProperty({
    type: Object,
    description: 'value',
  })
  value: object;


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
