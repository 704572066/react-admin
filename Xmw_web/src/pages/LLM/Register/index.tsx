/*
 * @Description: 组织架构
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-24 11:16:36
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 14:54:44
 */
import { NodeData, OrganizationGraph } from '@ant-design/charts';
import { PageContainer,ProCard } from '@ant-design/pro-components'
import { Listbox } from '@headlessui/react'
import { useRequest } from 'ahooks'
import { Card, Space } from 'antd'
import { get } from 'lodash-es'
import type { FC } from 'react';
import { useState } from 'react'
import { Toaster } from 'sonner'

import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import { ReactComponent as AngleDownSVG } from '@/svgs/angle-down.svg'
import GithubSVG from '@/svgs/github'
import  VanillaJSONEditor from './components/VanillaJSONEditor'
import Background from './components/background'
import Editor from './components/editor'
// import packageJson from '../package.json'
import Theme from './components/theme'
import Viewer from './components/viewer'
import { Height } from '@mui/icons-material';
const themes = ['default', 'a11y', 'github', 'vscode', 'atom', 'winter-is-coming']
const Structure: FC = () => {
	/**
	 * @description: 递归遍历树结构
	 * @param {*} tree
	 * @Author: 白雾茫茫丶
	 */
	function loopTree<T>(tree: (NodeData<{ name?: string }> & T &
	{ [key: string]: string })[], idField: string, nameField: string) {
		tree.forEach((node) => {
			node.id = node[idField]
			node.value = {}
			node.value.name = node[nameField]
			if (node.children) {
				loopTree(node.children, idField, nameField)
			}
		})
	}

	/**
	 * @description: 获取组织管理列表
	 * @return {*}
	 * @Author: 白雾茫茫丶
	 */
	const { data: orgList, loading } = useRequest<API.ORGANIZATION[], unknown[]>(
		async () => {
			const treeData = get(await getOrganizationList(), 'data', [])
			loopTree<API.ORGANIZATION>(treeData, 'org_id', 'org_name')
			return treeData
		});

	const [theme, setTheme] = useState('default')
	const [stringLength, setStringLength] = useState('')
	const [objectSize, setObjectSize] = useState('')
	const [content, setContent] = useState({
    json: {
      greeting: "Hello World",
      color: "#ff3e00",
      ok: true,
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    text: undefined,
  });
	const data = {
		id: '1',
		value: {
			name: 'Xmw Admin',
		},
		children: orgList,
	}
	return (
		<PageContainer header={{ title: null }}>
			 <Card loading={loading}> 
			 <div >
			 <VanillaJSONEditor content={content}/>
			 </div>
			</Card> 
		</PageContainer>
	)
}

export default Structure