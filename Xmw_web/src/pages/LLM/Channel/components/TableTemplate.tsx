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
import { Alert, App, Form, InputNumber, message, Popconfirm, Space, Switch, Tag, Tooltip } from 'antd'
import { values } from 'lodash';
import { map } from 'lodash-es'
import { FC, useRef, useState } from 'react';

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
	statusColumn,
} from '@/components/TableColumns'
import { delChannel, getChannelList, setChannelPriority, 
	setChannelStatus, setChannelWeight, testChannel } from '@/services/llm/channel' // 渠道管理接口
import { formatPerfix, formatResponse } from '@/utils'
import { IconFont } from '@/utils/const'
import { CHANNEL_STATUS, INTERNATION, ROUTES } from '@/utils/enums'
import { renderBalance, renderQuota } from '@/utils/oneapi/common'
import { CHANNEL_OPTIONS } from '@/utils/oneapi/constants/channel'
import type { ChannelStatusParams, ChannelWeightParams, SearchParams, TestChannelParams } from '@/utils/types/llm/channel'

import FormTemplate from './FormTemplate' // 表单组件

const TableTemplate: FC = () => {
	const { formatMessage } = useIntl();
	// hooks 调用
	const { message } = App.useApp();
	// 表单实例
	const [form] = Form.useForm<API.CHANNEL>();
	// 获取表格实例
	const tableRef = useRef<ActionType>();
	const [channelLoading, { setTrue: setChannelLoadingTrue, setFalse: setChannelLoadingFalse }] = useBoolean(false);
	const [channelId, setChannelId] = useState<number>()
	// oneapi
	const [openTest, setOpenTest] = useState<boolean | null>(false);
	const [responseTimeData, setResponseTimeData] = useState({ test_time: 0, response_time: 0 });
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

	// const manageChannel = async (id:number, action:string, value:string) => {
  //   const url = 'http://localhost:3002/api/channel/';
  //   const data = { id };
  //   let res = null;

  //   try {
  //     switch (action) {
  //       case 'copy': {
  //         const oldRes = await API.get(`/api/channel/${id}`);
  //         const { success, message, data } = oldRes.data;
  //         if (!success) {
  //           alert(message);
  //           return;
  //         }
  //         // 删除 data.id
  //         delete data.id;
  //         data.name = data.name + '_copy';
  //         res = await API.post('/api/channel/', { ...data });
  //         break;
  //       }
  //       case 'delete':
  //         res = await API.delete(url + id);
  //         break;
  //       case 'status':
  //         res = await API.put(url, {
  //           ...data,
  //           status: value,
  //         });
  //         break;
  //       case 'priority':
  //         if (value === '') {
  //           return;
  //         }
  //         res = await API.put(url, {
  //           ...data,
  //           priority: parseInt(value),
  //         });
  //         break;
  //       case 'weight':
  //         if (value === '') {
  //           return;
  //         }
  //         res = await API.put(url, {
  //           ...data,
  //           weight: parseInt(value),
  //         });
  //         break;
  //       case 'test':
  //         res = await API.get(url + `test/${id}`, {
  //           params: { model: value },
  //         });
  //         break;
  //     }
  //     const { success, message } = res.data;
  //     if (success) {
  //       alert('操作成功完成！');
  //       if (action === 'delete' || action === 'copy') {
  //         await handleRefresh();
  //       }
  //     } else {
  //       alert(message);
  //     }

  //     return res.data;
  //   } catch (error) {
  //     return;
  //   }
  // };

	

	/**
	 * @description: 获取角色管理列表
	 * @author: 白雾茫茫丶
	 */
	const { runAsync: fetchChannelList } = useRequest(
		async (params) => formatResponse(await getChannelList(params)), {
		manual: true,
	},
	)

	// 设置渠道状态
	const changeChannelStatus = async ({ id, status }: ChannelStatusParams) => {
		await setChannelStatus({
			id,
			status: status === CHANNEL_STATUS.MANUAL ? CHANNEL_STATUS.ENABLE : CHANNEL_STATUS.MANUAL,
		}).then((result) => {
			message.success(result.msg)
			reloadTable()
		}).finally(() => {
			setChannelLoadingFalse()
		})
	}

	// 测试渠道
	const testChannelStatus = async ({ id, name, test_model }: TestChannelParams) => {
		await testChannel({
			id,
			name,
			test_model,
		}).then((result) => {
			// message.success(result.msg)
			if(result.data.success) {
				setResponseTimeData({ test_time: Date.now() / 1000, response_time: result.data.time * 1000 });
      	message.success(`通道 ${name} : ${test_model} 测试成功，耗时 ${result.data.time.toFixed(2)} 秒。`);
				reloadTable()
			}
			else
				message.error(result.data.message);
		}).finally(() => {
			setChannelLoadingFalse()
		})
	}

	// 修改渠道权重
	const changeChannelWeight = async (id:number, weight:number) => {
		await setChannelWeight({
			id,
			weight,
		}).then((result) => {
			message.success(result.msg)
			reloadTable()
		}).finally(() => {
			setChannelLoadingFalse()
		})
	}

		// 修改渠道权限
		const changeChannelPriority = async (id:number, priority:number) => {
			await setChannelPriority({
				id,
				priority,
			}).then((result) => {
				message.success(result.msg)
				reloadTable()
			}).finally(() => {
				setChannelLoadingFalse()
			})
		}
	

	// 处理渠道响应时间
	const handleResponseTime = async (id:number, name:string, modelName:string) => {
    setOpenTest(null);

    // if (typeof modelName !== 'string') {
    //   modelName = item.test_model;
    // }

    if (modelName === '') {
      // alert('请先设置测试模型');
			message.info('请先设置测试模型');
      return;
    }
    await testChannelStatus({id, name, test_model: modelName});
		// const success = false;
		// const time = 1;
    // if (success) {
    //   setResponseTimeData({ test_time: Date.now() / 1000, response_time: time * 1000 });
    //   alert(`通道 ${modelName} 测试成功，耗时 ${time.toFixed(2)} 秒。`);
    // }
  };



	// 渲染设置渠道状态
	const renderChannelStatus = (record: API.CHANNEL) => (
		<Popconfirm
			title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
			open={channelId === record.id && channelLoading}
			onConfirm={() => changeChannelStatus(record)}
			onCancel={() => setChannelLoadingFalse()}
			key="popconfirm"
		><Switch
				checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
				unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
				checked={record.status === CHANNEL_STATUS.ENABLE}
				loading={channelId === record.id && channelLoading}
				onChange={() => { setChannelLoadingTrue(); setChannelId(record.id) }}
			/>
		</Popconfirm>
	);
	/**
* @description: proTable columns 配置项
* @return {*}
* @author: 白雾茫茫丶
*/
	const columns: ProColumns<API.CHANNEL>[] = [
		{
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 38,
			align: 'center',
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'name') }),
			dataIndex: 'name',
			ellipsis: true,
			width: 60,
			render: (text) => <Space>
				<Tag
					icon={<IconFont type="icon-role-management" className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'type') }),
			dataIndex: 'type',
			ellipsis: true,
			align: 'center',
			width: 60,
			render: (_, record) => <Space>
			<Tag>
				{CHANNEL_OPTIONS[record.type].text}
			</Tag>
		</Space>,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'group') }),
			dataIndex: 'group',
			ellipsis: true,
			width: 60,
			align: 'center',
			render: (text) => <Space>
				<Tag>
					{text}
				</Tag>
			</Space>,
		},
		// {
		// 	title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'role_code') }),
		// 	dataIndex: 'role_code',
		// 	width: 140,
		// 	ellipsis: true,
		// },
		/* 状态 */
		{
			...statusColumn,
			render: (_, record) => renderChannelStatus(record),
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'response_time') }),
			dataIndex: 'response_time',
			tooltip:'点击测速',
			ellipsis: true,
			width: 65,
			align: 'center',
			render: (_, record) => <ResponseTimeLabel
			test_time={record.test_time}
			response_time={record.response_time}
			handle_action={() => handleResponseTime(record.id, record.name, record.test_model)}
		/>,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'balance') }),
			dataIndex: 'balance',
			ellipsis: true,
			width: 60,
			align: 'center',
			render: (_, record) => renderBalance(record.type, record.balance),
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'used_quota') }),
			dataIndex: 'used_quota',
			ellipsis: true,
			width: 60,
			align: 'center',
			render: (_, record) => renderQuota(record.used_quota),
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'priority') }),
			dataIndex: 'priority',
			ellipsis: true,
			
			width: 65,
			align: 'center',
			valueType: 'digit',
			// editable: (text, record, index) => {
      //   return true;
			// },
			render: (_, record) => <InputNumber onBlur={(e) => changeChannelPriority(record.id, Number(e.target.value))} style={{
				width: 60,
			}} defaultValue={record.priority} min={0} />
			,
			// render: (text) => <Space>
			// 	<Tag>
			// 		{text}
			// 	</Tag>
			// </Space>,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.CHANNEL, 'weight') }),
			dataIndex: 'weight',
			ellipsis: true,
			width: 60,
			align: 'center',
			valueType: 'digit',
			render: (_, record) => <InputNumber onBlur={(e) => changeChannelWeight(record.id, Number(e.target.value))} style={{
				width: 60,
			}} defaultValue={record.weight} min={1} />,
			
			// render: (text) => <Space>
			// 	<Tag>
			// 		{text}
			// 	</Tag>
			// </Space>,
		},
		/* 排序 */
		// sortColumn,
		/* 创建时间 */
		// createTimeColumn,
		/* 创建时间-搜索 */
		createTimeInSearch,
		/* 描述 */
		// describeColumn,
		{
			...operationColumn,
			render: (_, record) => (
				<Space>
				<SimpleDropdownMenu
					pathName={ROUTES.CHANNEL}
					items={record.models}
					// editCallback={() => {
					// 	// form.setFieldsValue({
					// 	// 	...record,
					// 	// 	menu_permission: map(record.id, 'id'),
					// 	// });
					// 	setOpenDrawerTrue()
					// }}
					// deleteParams={{
					// 	request: delChannel,
					// 	id: record.id.toLocaleString(),
					// }}
					reloadTable={reloadTable}
				/>
				<DropdownMenu
					pathName={ROUTES.CHANNEL}
					editCallback={() => {
						// form.setFieldsValue({
						// 	...record,
						// 	menu_permission: map(record.id, 'id'),
						// });
						setOpenDrawerTrue()
					}}
					deleteParams={{
						request: delChannel,
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
				<Alert showIcon closable message="优先级/权重解释：" description={<>1. 优先级越大，越优先使用；(只有该优先级下的节点都冻结或者禁用了，才会使用低优先级的节点)
  <br />2. 相同优先级下：根据权重进行负载均衡(加权随机)
	<br />3. 如果在设置-通用设置中设置了“重试次数”和“重试间隔”，则会在失败后重试。
	<br />4. 重试逻辑：1）先在高优先级中的节点重试，如果高优先级中的节点都冻结了，才会在低优先级中的节点重试。2）如果设置了“重试间隔”，则某一渠道失败后，会冻结一段时间，所有人都不会再使用这个渠道，直到冻结时间结束。3）重试次数用完后，直接结束。</>}
				type="info" /> 
			
				<ProTable<API.CHANNEL, SearchParams>
					actionRef={tableRef}
					columns={columns}
					request={async (params: SearchParams) => fetchChannelList(params)}
					rowKey="id"
					pagination={{
						pageSize: 5,
					}}
					// 工具栏
					toolBarRender={() => [
						// 新增按钮
						<CreateButton
							key="create"
							pathName={ROUTES.CHANNEL}
							callback={() => setOpenDrawerTrue()} />,
					]}
					scroll={{ x: columnScrollX(columns) }}
					onDataSourceChange={() => {// Table 的数据发生改变时触发	
						form.resetFields();// 在数据更新后重置表单
					}}
					expandedRowRender={(record) => {
						let modelMap = [];
						modelMap = record.models.split(',');
						modelMap.sort();
						return (
							<Space direction="vertical" style={{
								width: '100%',
								}}>
								<Space>可用模型： {modelMap.map((item, index) => (
        <Tag color="blue" key={index}>{item}</Tag>
      ))}</Space>
								{record.test_model !== '' ? <Space>测速模型：<Tag color='cyan'>{record.test_model}</Tag></Space> : null}
								{/* 你可以在这里放置更多的内容 */}
							</Space>
						);
					}}
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