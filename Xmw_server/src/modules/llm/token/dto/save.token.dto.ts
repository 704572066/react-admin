/*
 * @Description: 保存角色数据 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-28 18:06:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 14:10:09
 */
import { ApiProperty } from '@nestjs/swagger';

// import { json } from 'sequelize';
// import { json } from 'sequelize';
// import { JSON } from 'sequelize';
import type { TokenStatus } from '@/utils/types/llm';
// import { json } from 'sequelize';

/**
 * @description: 保存角色数据 Dto
 * @author: 白雾茫茫丶
 */
export class SaveTokenDto {
  // @ApiProperty({
  //   type: Number,
  //   description: 'id',
  // })
  // id: number;

  @ApiProperty({
    type: String,
    description: 'name',
  })
  type: string;

  @ApiProperty({
    type: Number,
    description: 'expired_time',
    default: -1,
  })
  expired_time: number;

  @ApiProperty({
    type: Number,
    description: 'remain_quota',
  })
  remain_quota: number;

  @ApiProperty({
    type: Boolean,
    description: 'unlimited_quota',
  })
  unlimited_quota: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'is_edit',
    default:false,
  })
  is_edit: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'chat_cache',
    default:false,
  })
  chat_cache: boolean;
}

export class EditTokenDto extends SaveTokenDto {

  @ApiProperty({
  type: Number,
  description: 'id',
  })
  id: number;

  @ApiProperty({
    type: Number,
    description: '状态',
    default: 1,
  })
  status: number;

  // @ApiProperty({
  //   type: Number,
  //   description: '创建时间',
  // })
  // created_time: number;

  // @ApiProperty({
  //   type: Number,
  //   description: '测试时间',
  // })
  // test_time: number;

  // @ApiProperty({
  //   type: Number,
  //   description: '响应时间',
  // })
  // response_time: number;

  // @ApiProperty({
  //   type: Number,
  //   description: 'balance',
  // })
  // balance: number;

  // @ApiProperty({
  //   type: Number,
  //   description: 'balance_updated_time',
  // })
  // balance_updated_time: number;

  // @ApiProperty({
  //   type: Number,
  //   description: 'used_quota',
  // })
  // used_quota: number;

  // @ApiProperty({
  //   type: Number,
  //   description: 'priority',
  // })
  // priority: number;

}
/**
 * @description: 更新角色状态 Dto
 * @author: 白雾茫茫丶
 */
export class UpdateTokenStatusDto {
  @ApiProperty({
    type: Number,
    description: '角色状态',
    default: 1,
  })
  status: TokenStatus;
}
