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
 * @description:  获取渠道列表
 * @param {SearchParams} options
 * @Author: guj
 */
export const getChannelList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.CHANNEL>>(`${baseURL}`, options);

/**
 * @description:  获取渠道
 * @param {SearchParams} options
 * @Author: guj
 */
export const getChannel = (id: number) =>
  httpRequest.get<API.CHANNEL>(`${baseURL}/items/${id}`);

/**
 * @description:  获取分组
 * @Author: guj
 */
export const getGroup = () =>
  httpRequest.get<any>(`${baseURL}/group`);

/**
 * @description: 新增渠道
 * @param {API.CHANNEL} options
 * @Author: guj
 */
export const createChannel = (
  options: Omit<API.CHANNEL, 'id' | 'created_time' | 'updated_time'>,
) => httpRequest.post<API.CHANNEL>(`${baseURL}`, options);

/**
 * @description: 更新渠道
 * @param {API.CHANNEL} options
 * @Author: guj
 */
export const updateChannel = ({ id, ...options }: API.CHANNEL) =>
  httpRequest.put<number[]>(`${baseURL}/${id}`, options);

/**
 * @description: 删除渠道
 * @param {number} id
 * @Author: guj
 */
export const delChannel = (id: number) => httpRequest.delete<number>(`${baseURL}/${id}`);

/**
 * @description: 设置渠道状态
 * @param {Data} options
 * @Author: guj
 */
export const setChannelStatus = ({ id, status }: ChannelStatusParams) =>
  httpRequest.patch<number[]>(`${baseURL}/${id}`, { status });


export const testChannel = ({ id, test_model }: TestChannelParams) =>
  httpRequest.get<API.TEST_CHANNEL>(`${baseURL}/test/${id}?model=${test_model}`);

export const setChannelWeight = ({ id, weight }: ChannelWeightParams) =>
  httpRequest.patch<number[]>(`${baseURL}/weight/${id}`, { weight });

export const setChannelPriority = ({ id, priority }: ChannelPriorityParams) =>
  httpRequest.patch<number[]>(`${baseURL}/priority/${id}`, { priority });

export const getModels = () =>
  httpRequest.get<any>(`${baseURL}/models/`);