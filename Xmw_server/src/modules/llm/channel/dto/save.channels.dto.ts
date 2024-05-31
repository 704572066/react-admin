/*
 * @Description: 保存角色数据 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-28 18:06:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 14:10:09
 */
import { ApiProperty } from '@nestjs/swagger';

import type { ChannelStatus } from '@/utils/types/llm';
// import { json } from 'sequelize';
// import { json } from 'sequelize';
import { JSON } from 'sequelize';
// import { json } from 'sequelize';

/**
 * @description: 保存角色数据 Dto
 * @author: 白雾茫茫丶
 */
export class SaveChannelDto {
  // @ApiProperty({
  //   type: Number,
  //   description: 'id',
  // })
  // id: number;

  @ApiProperty({
    type: Number,
    description: '渠道类型',
  })
  type: number;

  // @ApiProperty({
  //   type: Number,
  //   description: '状态',
  //   default: 1,
  // })
  // status: number;

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

  @ApiProperty({
    type: String,
    description: 'base_url',
  })
  base_url: string;

  @ApiProperty({
    type: String,
    description: 'other',
  })
  other: string;

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

  @ApiProperty({
    type: String,
    description: 'models',
  })
  models: string;

  @ApiProperty({
    type: String,
    description: 'key',
  })
  key: string;

  @ApiProperty({
    type: String,
    description: 'group',
  })
  group: string;

  @ApiProperty({
    type: Array,
    description: 'groups',
  })
  groups: string[];

  // @ApiProperty({
  //   type: Number,
  //   description: 'used_quota',
  // })
  // used_quota: number;

  @ApiProperty({
    type: String,
    description: 'model_mapping',
  })
  model_mapping: string;

  // @ApiProperty({
  //   type: Number,
  //   description: 'priority',
  // })
  // priority: number;

  @ApiProperty({
    type: String,
    description: 'proxy',
  })
  proxy: string;

  @ApiProperty({
    type: String,
    description: 'name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'test_model',
  })
  test_model: string;

  @ApiProperty({
    type: Boolean,
    description: 'only_chat',
  })
  only_chat: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'is_edit',
  })
  is_edit: boolean;

  @ApiProperty({
    type: String,
    description: 'plugin',
  })
  plugin: string;
}

export class EditChannelDto extends SaveChannelDto {

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

  @ApiProperty({
    type: Number,
    description: '创建时间',
  })
  created_time: number;

  @ApiProperty({
    type: Number,
    description: '测试时间',
  })
  test_time: number;

  @ApiProperty({
    type: Number,
    description: '响应时间',
  })
  response_time: number;

  @ApiProperty({
    type: Number,
    description: 'balance',
  })
  balance: number;

  @ApiProperty({
    type: Number,
    description: 'balance_updated_time',
  })
  balance_updated_time: number;

  @ApiProperty({
    type: Number,
    description: 'used_quota',
  })
  used_quota: number;

  @ApiProperty({
    type: Number,
    description: 'priority',
  })
  priority: number;

}
/**
 * @description: 更新角色状态 Dto
 * @author: 白雾茫茫丶
 */
export class UpdateChannelStatusDto {
  @ApiProperty({
    type: Number,
    description: '角色状态',
    default: 1,
  })
  status: ChannelStatus;
}
