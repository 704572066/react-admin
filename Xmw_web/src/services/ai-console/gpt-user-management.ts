/*
 * @Description: 系统设置-用户管理-API
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-26 17:33:32
 */
import { ROUTES } from '@/utils/enums'
import type { PageResponse } from '@/utils/types'
import type { GPTUserStatusProps } from '@/utils/types/ai-console/gpt-user-management'
import type { SearchParams, UserStatusProps } from '@/utils/types/system/user-management'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.GPTUSERMANAGEMENT

/**
 * @description:  获取用户列表
 * @param {SearchParams} options
 * @Author: 白雾茫茫丶
 */
export const getUserList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.USERMANAGEMENT>>(`${baseURL}`, options);

/**
 * @description: 新增用户数据
 * @param {API.USERMANAGEMENT} options
 * @Author: 白雾茫茫丶
 */
export const createGPTUser = (options: API.GPTUSERMANAGEMENT) => httpRequest.post<API.GPTUSERMANAGEMENT>(`${baseURL}`, options);

/**
 * @description: 更新用户数据
 * @param {API.USERMANAGEMENT} options
 * @Author: 白雾茫茫丶
 */
export const updateGPTUser = ({ id, ...options }: Partial<API.GPTUSERMANAGEMENT>) =>
  httpRequest.put<number[]>(`${baseURL}/${id}`, options);

/**
 * @description: 删除用户数据
 * @param {string} user_id
 * @Author: 白雾茫茫丶
 */
export const delUser = (user_id: string) => httpRequest.delete<number>(`${baseURL}/${user_id}`);

/**
 * @description: 设置角色状态
 * @param {Data} options
 * @Author: 白雾茫茫丶
 */
export const setGPTUserStatus = ({ id, status }: GPTUserStatusProps) =>
  httpRequest.patch<number[]>(`${baseURL}/${id}`, { status });
