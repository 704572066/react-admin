/*
 * @Description: 系统设置-角色管理-API
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 10:17:47
 */
import { ROUTES } from '@/utils/enums'
import type { PageResponse } from '@/utils/types'
import type { ChannelPriorityParams, ChannelStatusParams, ChannelWeightParams,
  SearchParams, TestChannelParams } from '@/utils/types/llm/channel'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.CHANNEL

/**
 * @description:  获取角色列表
 * @param {SearchParams} options
 * @Author: 白雾茫茫丶
 */
export const getChannelList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.CHANNEL>>(`${baseURL}`, options);

// /**
//  * @description: 新增角色数据
//  * @param {API.ROLEMANAGEMENT} options
//  * @Author: 白雾茫茫丶
//  */
// export const createRole = (
//   options: Omit<API.ROLEMANAGEMENT, 'role_id' | 'founder' | 'created_time' | 'updated_time'>,
// ) => httpRequest.post<API.ROLEMANAGEMENT>(`${baseURL}`, options);

// /**
//  * @description: 更新角色数据
//  * @param {API.ROLEMANAGEMENT} options
//  * @Author: 白雾茫茫丶
//  */
// export const updateRole = ({ role_id, ...options }: API.ROLEMANAGEMENT) =>
//   httpRequest.put<number[]>(`${baseURL}/${role_id}`, options);

// /**
//  * @description: 删除角色数据
//  * @param {string} role_id
//  * @Author: 白雾茫茫丶
//  */
export const delChannel = (role_id: string) => httpRequest.delete<number>(`${baseURL}/${role_id}`);

// /**
//  * @description: 设置角色状态
//  * @param {Data} options
//  * @Author: 白雾茫茫丶
//  */
export const setChannelStatus = ({ id, status }: ChannelStatusParams) =>
  httpRequest.patch<number[]>(`${baseURL}/${id}`, { status });


export const testChannel = ({ id, test_model }: TestChannelParams) =>
  httpRequest.get<API.TEST_CHANNEL>(`${baseURL}/${id}?model=${test_model}`);

export const setChannelWeight = ({ id, weight }: ChannelWeightParams) =>
  httpRequest.patch<number[]>(`${baseURL}/weight/${id}`, { weight });

export const setChannelPriority = ({ id, priority }: ChannelPriorityParams) =>
  httpRequest.patch<number[]>(`${baseURL}/priority/${id}`, { priority });