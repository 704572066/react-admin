import type { PaginationParams, SearchTimes } from '@/utils/types'
/**
 * @description: FormTemplate Props
 * @Author: 白雾茫茫丶
 */
export type FormTemplateProps = {
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void
};

/**
 * @description: 头部搜索表单 Params
 * @author: 白雾茫茫丶
 */
export type SearchParams = PaginationParams &
  SearchTimes & Partial<Pick<API.CHANNEL, 'name' | 'type' | 'status'| 'group'>>

/**
 * @description: 设置角色状态 Params
 * @author: 白雾茫茫丶
 */
export type ChannelStatusParams = Pick<API.CHANNEL, 'id' | 'status'>

/**
 * @description: 设置角色状态 Params
 * @author: 白雾茫茫丶
 */
export type TestChannelParams = Pick<API.CHANNEL, 'id' | 'name' | 'test_model'>

export type ChannelWeightParams = Pick<API.CHANNEL, 'id' | 'weight'>

export type ChannelPriorityParams = Pick<API.CHANNEL, 'id' | 'priority'>