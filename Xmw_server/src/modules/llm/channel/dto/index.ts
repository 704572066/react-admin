/*
 * @Description: 角色管理 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-28 17:51:55
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 14:12:12
 */
import { ListChannelsDto } from './list.channels.dto'; // 查询角色管理列表参数 Dto
import {
  CreateChannelDto,
  ResponseChannelDto,
} from './response.channels.dto'; // 查询角色管理列表参数 Dto
import {
  EditChannelDto,
  SaveChannelDto,
  UpdateChannelStatusDto,
} from './save.channels.dto'; // 保存角色数据 Dto

export {
  ListChannelsDto,
  EditChannelDto,
  ResponseChannelDto,
  SaveChannelDto,
  UpdateChannelStatusDto,
  CreateChannelDto,
};
