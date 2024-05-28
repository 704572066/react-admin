/*
 * @Description: 表格操作下拉菜单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-30 17:50:17
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-17 11:32:03
 */
import { ClusterOutlined, DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons' // antd 图标库
import { Access, useAccess, useIntl } from '@umijs/max'
import { App, Button, Dropdown, MenuProps } from 'antd'
import { filter, get } from 'lodash-es'
import { FC } from 'react'

import { formatPathName, isSuccess } from '@/utils'
import { INTERNATION, OPERATION } from '@/utils/enums'
import permissions from '@/utils/permission'
import type { PathNames, Response } from '@/utils/types'

// type DeleteParams = {
//   request: (id: string) => Promise<Response>; // 删除接口 
//   id: string; // 删除 id 字段
// }

export type DropdownMenuProps = {
  pathName: PathNames; // 路由字段
  items: string;
  // addChildCallback?: () => void; // 添加子级回调
  // editCallback?: () => void; // 编辑回调
  // deleteParams: DeleteParams;
  reloadTable: () => void; // 刷新表格
}

const SimpleDropdownMenu: FC<DropdownMenuProps> = ({
  pathName,
  items,
  // addChildCallback,
  // editCallback,
  // deleteParams,
  reloadTable,
}) => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // 权限定义集合
  const access = useAccess();
  // hooks 调用
  const { modal, message } = App.useApp();
  // 国际化前缀
  const formatPerfix = formatPathName(pathName)
  let modelMap = [];
  modelMap = items.split(',');
  modelMap.sort();

  // 下拉菜单
  const menuItems: MenuProps['items'] = modelMap.map((model) => (
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          {model}
        </a>
      ),
    }
  ))

  /**
   * @description: 点击菜单回调
   * @author: 白雾茫茫丶
   */
  const onClickMenuItem: MenuProps['onClick'] = ({ key }) => {
    // 删除参数
    // const { request, id } = deleteParams
    alert('r')
    
  };
  return (
    <Dropdown menu={{ items: menuItems, onClick: onClickMenuItem }}>
      <Button type="primary" size="small">
        {formatMessage({ id: INTERNATION.TEST })}
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}
export default SimpleDropdownMenu