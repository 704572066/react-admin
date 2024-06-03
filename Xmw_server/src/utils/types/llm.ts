/*
 * @Description: System Attributes
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-27 10:10:44
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:32:56
 */
import type {
  EnumValues
} from '@/utils/types';

import { CHANNEL_STATUS, TOKEN_STATUS } from '../enums';

// import { JobsAttributes, OrgAttributes } from './administrative';


/**
 * @description: xmw_users Attributes
 * @author: 白雾茫茫丶
 */
export type ChannelsAttributes = {
  id: number; // id
  type: number; // 名称
  key: string; // 用户工号
  status: number; // 密码(加密)
  name: string; // 中文名
  weight: number; // 英文名
  created_time: number; // 年龄
  test_time: number; // 电子邮箱
  response_time: number; // 电话号码
  base_url: string; // 用户头像
  other: string; // 用户性别
  balance: number; // 用户令牌
  balance_updated_time: number; // 座右铭
  models: string; // 人物标签
  group: string; // 所属城市
  used_quota: number; // 详细地址
  model_mapping: string; // 登录次数
  priority: number;
  proxy: string;
  test_model: string;
  only_chat: boolean;
  plugin: string;
  // login_last_ip?: string; // 最后一次登录ip
  // login_last_time?: Date; // 最后一次登录时间
} 

export type AbilitiesAttributes = {
  group: string;
  model: string;
  channel_id: number;
  enabled: number;
  priority: number;
  weight: number;
} 

/**
 * @description: 状态
 * @author: 白雾茫茫丶
 */
export type ChannelStatus = EnumValues<typeof CHANNEL_STATUS>;

/**
 * @description: 状态
 * @author: 白雾茫茫丶
 */
export type TokenStatus = EnumValues<typeof TOKEN_STATUS>;



/**
 * @description: xmw_users Attributes
 * @author: 白雾茫茫丶
 */
export type TokenAttributes = {
  id: number; // id
  user_id: number; // 名称
  key: string; // 用户工号
  name: string; // 用户工号
  status: number; // 密码(加密)
  created_time: number; // 年龄
  accessed_time: number; // 电子邮箱
  expired_time: number; // 电话号码
  used_quota: number; // 详细地址
  unlimited_quota: number;
  remain_quota: number;
  chat_cache: number;
} 
