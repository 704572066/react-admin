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
import type { SearchParams } from '@/utils/types/system/user-management'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.REGISTER

/**
 * @description:  获取配置
 * @param {SearchParams} options
 * @Author: guj
 */
export const getConfig = (options?: SearchParams) =>
  httpRequest.get<API.REGISTER>(`${baseURL}`, options);

/**
 * @description: 更新配置
 * @param {API.REGISTER} options
 * @Author: guj
 */
export const updateConfig = ({ id, value }: Partial<API.REGISTER>) =>
  httpRequest.post<number[]>(`${baseURL}`, {id, value});
