/*
 * @Description: 查询角色管理列表参数 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-28 17:47:10
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 16:57:17
 */
import { ApiProperty } from '@nestjs/swagger';

import type { ChannelStatus } from '@/utils/types';

export class ListChannelsDto {
  @ApiProperty({
    type: String,
    description: '名称',
    default: '',
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: '分组',
    default: '',
    required: false,
  })
  group?: string;

  @ApiProperty({
    type: Number,
    description: '类型',
    default: '',
    required: false,
  })
  type?: number;

  @ApiProperty({
    type: Number,
    description: '状态',
    default: 1,
    required: false,
  })
  status?: ChannelStatus;

  @ApiProperty({
    type: Number,
    description: '条数',
    default: 10,
  })
  pageSize: number;

  @ApiProperty({
    type: Number,
    description: '当前页码',
    default: 1,
  })
  current: number;

  // @ApiProperty({
  //   type: Date,
  //   description: '开始日期',
  //   default: '2022-10-01 00:00:00',
  //   required: false,
  // })
  // start_time?: Date;

  // @ApiProperty({
  //   type: Date,
  //   description: '结束日期',
  //   default: '2022-10-02 23:59:59',
  //   required: false,
  // })
  // end_time?: Date;
}
