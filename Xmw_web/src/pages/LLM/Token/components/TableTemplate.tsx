/*
 * @Description: 角色管理-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-26 14:36:02
 */
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
// import { Alert, Space } from 'antd'
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl } from '@umijs/max'
import { useBoolean, useRequest } from 'ahooks';
import { Alert, App, Button, Form, InputNumber, message, Popconfirm, Space, Switch, Tag, Tooltip } from 'antd'
import { values } from 'lodash';
import { map, mapValues } from 'lodash-es'
import { FC, useEffect, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu' // 表格操作下拉菜单
import ResponseTimeLabel from '@/components/oneapi/ResponseTimeLabel';
import SimpleDropdownMenu from '@/components/SimpleDropdownMenu' // 表格操作下拉菜单
import {
	columnScrollX,
	CreateButton,
	createTimeColumn,
	createTimeInSearch,
	describeColumn,
	operationColumn,
	sortColumn,
	tokenStatusColumn,
} from '@/components/TableColumns'
import { delToken, getTokenList, setTokenStatus } from '@/services/llm/token' // 渠道管理接口
import { formatPerfix, formatResponse } from '@/utils'
import { IconFont } from '@/utils/const'
import { INTERNATION, ROUTES,TOKEN_STATUS } from '@/utils/enums'
import { renderQuota,timestamp2string } from '@/utils/oneapi/common'
// import { timestamp2string } from '@/utils/oneapi/common';
// import { CHANNEL_OPTIONS } from '@/utils/oneapi/constants/channel'
import type { SearchParams,TokenStatusParams } from '@/utils/types/llm/token'

import FormTemplate from './FormTemplate' // 表单组件
const TableTemplate: FC = () => {
	const { formatMessage } = useIntl();
	// hooks 调用
	const { message } = App.useApp();
	// 表单实例
	const [form] = Form.useForm<API.CHANNEL>();
	// 获取表格实例
	const tableRef = useRef<ActionType>();
	const [tokenLoading, { setTrue: setTokenLoadingTrue, setFalse: setTokenLoadingFalse }] = useBoolean(false);
	const [tokenId, setTokenId] = useState<number>()
	// oneapi

	// const [weightValve, setWeight] = useState(item.weight);
	// 是否显示抽屉表单
	const [openDrawer, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] = useBoolean(false)
	// 跟随主题色变化
	const PrimaryColor = useEmotionCss(({ token }) => {
		return { color: token.colorPrimary, fontSize: 16 };
	});
	// 手动触发刷新表格
	function reloadTable() {
		tableRef?.current?.reload()
	}

		/**
	 * @description: 获取渠道列表
	 * @author: guj
	 */
		const { runAsync: fetchTokenList } = useRequest(
			async (params) => formatResponse(await getTokenList(params)), {
			manual: true,
		},
		)

	// 设置渠道状态
	const changeTokenStatus = async ({ id, status }: TokenStatusParams) => {
		await setTokenStatus({
			id,
			status: status === TOKEN_STATUS.MANUAL ? TOKEN_STATUS.ENABLE : TOKEN_STATUS.MANUAL,
		}).then((result) => {
			message.success(result.msg)
			reloadTable()
		}).finally(() => {
			setTokenLoadingFalse()
		})
	}


	// 渲染设置渠道状态
	const renderTokenStatus = (record: API.TOKEN) => (
		<Popconfirm
			title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
			open={tokenId === record.id && tokenLoading}
			onConfirm={() => changeTokenStatus(record)}
			onCancel={() => setTokenLoadingFalse()}
			key="popconfirm"
		><Switch
				checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
				unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
				checked={record.status === TOKEN_STATUS.ENABLE}
				loading={tokenId === record.id && tokenLoading}
				onChange={() => { setTokenLoadingTrue(); setTokenId(record.id) }}
			/>
		</Popconfirm>
	);
	/**
* @description: proTable columns 配置项
* @return {*}
* @author: 白雾茫茫丶
*/
	const columns: ProColumns<API.TOKEN>[] = [
		{
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 28,
			align: 'center',
		},
		// {
		// 	dataIndex: 'id',
		// 	// valueType: 'indexBorder',
		// 	hideInTable: true,
		// 	hideInSearch: true,
		// 	width: 38,
		// 	align: 'center',
		// },
		{
			title: formatMessage({ id: formatPerfix(ROUTES.TOKEN, 'name') }),
			dataIndex: 'name',
			ellipsis: true,
			align: 'center',
			width: 80,
			render: (text) => <Space>

					{text}

			</Space>,
		},
		// {
		// 	title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'type') }),
		// 	dataIndex: 'type',
		// 	ellipsis: true,
		// 	align: 'center',
		// 	width: 80,
		// 	valueEnum: mapValues(CHANNEL_OPTIONS, (e) => e.text),
		// 	render: (_, record) => <Space>
		// 	<Tag>
		// 		{CHANNEL_OPTIONS[record.type].text}
		// 	</Tag>
		// </Space>,
		// },
		// {
		// 	title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'group') }),
		// 	dataIndex: 'group',
		// 	ellipsis: true,
		// 	width: 60,
		// 	align: 'center',
		// 	valueEnum: groupOptions.reduce((groupOptions, key) => {
		// 		groupOptions[key] = key; // 或者使用其他默认值，比如 null 或 0
		// 		return groupOptions;
		// 	}, {} as Record<string, string>),
		// 	render: (text) => <Space>
		// 		<Tag>
		// 			{text}
		// 		</Tag>
		// 	</Space>,
		// },
		// {
		// 	title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'role_code') }),
		// 	dataIndex: 'role_code',
		// 	width: 140,
		// 	ellipsis: true,
		// },
		/* 状态 */
		{
			...tokenStatusColumn,
			render: (_, record) => renderTokenStatus(record),
		},
		// {
		// 	title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'response_time') }),
		// 	dataIndex: 'response_time',
		// 	tooltip:'点击测速',
		// 	hideInSearch: true,
		// 	ellipsis: true,
		// 	width: 65,
		// 	align: 'center',
		// 	render: (_, record) => <ResponseTimeLabel
		// 	test_time={record.test_time}
		// 	response_time={record.response_time}
		// 	handle_action={() => handleResponseTime(record.id, record.name, record.test_model)}
		// />,
		// },
		{
			title: formatMessage({ id: formatPerfix(ROUTES.TOKEN, 'used_quota') }),
			dataIndex: 'used_quota',
			hideInSearch: true,
			ellipsis: true,
			width: 60,
			align: 'center',
			render: (_, record) => renderQuota(record.used_quota),
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.TOKEN, 'remain_quota') }),
			dataIndex: 'remain_quota',
			ellipsis: true,
			hideInSearch: true,
			width: 60,
			align: 'center',
			render: (_, record) => record.unlimited_quota ? '无限制' : renderQuota(record.remain_quota, 2),
		},
		// {
		// 	title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'priority') }),
		// 	dataIndex: 'priority',
		// 	ellipsis: true,
		// 	hideInSearch: true,
		// 	width: 65,
		// 	align: 'center',
		// 	valueType: 'digit',
		// 	// editable: (text, record, index) => {
    //   //   return true;
		// 	// },
		// 	render: (_, record) => <InputNumber onBlur={(e) => changeChannelPriority(record.id, Number(e.target.value))} style={{
		// 		width: 60,
		// 	}} defaultValue={record.priority} min={0} />
		// 	,
		// 	// render: (text) => <Space>
		// 	// 	<Tag>
		// 	// 		{text}
		// 	// 	</Tag>
		// 	// </Space>,
		// },
		// {
		// 	title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'weight') }),
		// 	dataIndex: 'weight',
		// 	ellipsis: true,
		// 	hideInSearch: true,
		// 	width: 60,
		// 	align: 'center',
		// 	valueType: 'digit',
		// 	render: (_, record) => <InputNumber onBlur={(e) => changeChannelWeight(record.id, Number(e.target.value))} style={{
		// 		width: 60,
		// 	}} defaultValue={record.weight} min={1} />,
			
		// 	// render: (text) => <Space>
		// 	// 	<Tag>
		// 	// 		{text}
		// 	// 	</Tag>
		// 	// </Space>,
		// },
		/* 排序 */
		// sortColumn,
		/* 创建时间 */
		{
			title: formatMessage({ id: formatPerfix(ROUTES.TOKEN, 'created_time') }),
			dataIndex: 'created_time',
			// valueType: 'dateTime',
			hideInSearch: true,
			sorter: true,
			align: 'center',
			width: 160,
			render: (_, record) => timestamp2string(record.created_time),
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.TOKEN, 'expired_time') }),
			dataIndex: 'expired_time',
			hideInSearch: true,
			ellipsis: true,
			width: 65,
			align: 'center',
			render: (_, record) => record.expired_time === -1 ? '永不过期' : timestamp2string(record.expired_time),
		},
		/* 创建时间-搜索 */
		// createTimeInSearch,
		/* 描述 */
		// describeColumn,
		{
			...operationColumn,
			render: (_, record) => (
				<Space>
				<Button type="primary">复制</Button>
				<DropdownMenu
					pathName={ROUTES.TOKEN}
					editCallback={() => {
						form.setFieldsValue({
							...record,
							// menu_permission: map(record.id, 'id'),
						});
						setOpenDrawerTrue()
					}}
					deleteParams={{
						request: delToken,
						id: record.id,
					}}
					reloadTable={reloadTable}
				/>
				</Space>
			),
		},
	]

	return (
		<>
			<Space direction="vertical" style={{
      width: '100%',
    }}>
				<Alert showIcon closable message="" description={<>将OpenAI API基础地址https://api.openai.com替换为http://localhost:3000，复制下面的密钥即可使用。</>}
				type="info" /> 
			
				<ProTable<API.TOKEN, SearchParams>
					actionRef={tableRef}
					columns={columns}
					request={async (params: SearchParams) => fetchTokenList(params)}
					rowKey="id"
					pagination={{
						pageSize: 5,
					}}
					// 工具栏
					toolBarRender={() => [
						// 新增按钮
						<CreateButton
							key="create"
							pathName={ROUTES.TOKEN}
							callback={() => setOpenDrawerTrue()} />,
					]}
					scroll={{ x: columnScrollX(columns) }}
					onDataSourceChange={() => {// Table 的数据发生改变时触发	
						form.resetFields();// 在数据更新后重置表单
					}}
			// 		expandedRowRender={(record) => {
			// 			let modelMap = [];
			// 			modelMap = record.models.split(',');
			// 			modelMap.sort();
			// 			return (
			// 				<Space direction="vertical" style={{
			// 					width: '100%',
			// 					}}>
			// 					<Space>可用模型： {modelMap.map((item, index) => (
      //   <Tag color="blue" key={index}>{item}</Tag>
      // ))}</Space>
			// 					{record.test_model !== '' ? <Space>测速模型：<Tag color='cyan'>{record.test_model}</Tag></Space> : null}
			// 					{/* 你可以在这里放置更多的内容 */}
			// 				</Space>
			// 			);
			// 		}}
					// editable={{
					// 	// form: form,
					// 	type: 'multiple',
					// 	actionRender: (row, config, defaultDom) => [defaultDom?.save, defaultDom.cancel],
					// 	// onSave: (key, row) => {
					// 		// console.log('当前行保存按钮', key, row, 'mySelectedRow', mySelectedRow);
					// 		// 处理先勾选然后编辑修改调整
					// 		// mySelectedRow.forEach((item) => {
					// 		// 	if (item.staffCode == row.staffCode) {
					// 		// 		item.teachLevel = row.teachLevel;
					// 		// 	}
					// 		// });
					// 	// },
					// }}
				/>
			</Space>
			{/* 抽屉表单 */}
			<Form form={form}>
				<FormTemplate reloadTable={reloadTable} open={openDrawer} setOpenDrawerFalse={setOpenDrawerFalse} />
			</Form>
		</>
	)
}
export default TableTemplate