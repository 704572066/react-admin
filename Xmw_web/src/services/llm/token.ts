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
import type { SearchParams, TokenStatusParams } from '@/utils/types/llm/token'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.TOKEN

/**
 * @description:  获取渠道列表
 * @param {SearchParams} options
 * @Author: guj
 */
export const getTokenList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.TOKEN>>(`${baseURL}`, options);

/**
 * @description:  获取渠道
 * @param {SearchParams} options
 * @Author: guj
 */
export const getToken = (id: number) =>
  httpRequest.get<API.TOKEN>(`${baseURL}/items/${id}`);

/**
 * @description: 新增渠道
 * @param {API.CHANNEL} options
 * @Author: guj
 */
export const createToken = (
  options: Omit<API.TOKEN, 'id' | 'created_time' | 'updated_time'>,
) => httpRequest.post<API.TOKEN>(`${baseURL}`, options);

/**
 * @description: 更新渠道
 * @param {API.CHANNEL} options
 * @Author: guj
 */
export const updateToken = ({ id, ...options }: API.TOKEN) =>
  httpRequest.put<number[]>(`${baseURL}`, { id, ...options });

/**
 * @description: 删除渠道
 * @param {number} id
 * @Author: guj
 */
export const delToken = (id: number) => httpRequest.delete<number>(`${baseURL}/${id}`);

/**
 * @description: 设置渠道状态
 * @param {Data} options
 * @Author: guj
 */
export const setTokenStatus = ({ id, status }: TokenStatusParams) =>
  httpRequest.patch<number[]>(`${baseURL}/${id}`, { status });
