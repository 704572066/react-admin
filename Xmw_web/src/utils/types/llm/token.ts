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
  SearchTimes & Partial<Pick<API.TOKEN, 'name' | 'type' | 'status' >>

/**
 * @description: 设置角色状态 Params
 * @author: 白雾茫茫丶
 */
export type TokenStatusParams = Pick<API.TOKEN, 'id' | 'status'>
