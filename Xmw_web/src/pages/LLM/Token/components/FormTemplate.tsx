/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-08 09:14:05
 */

import { ModalForm } from '@ant-design/pro-components';
import { Alert, App, Form, Space } from 'antd';
import { useFormik } from 'formik'
// import type { FC } from 'react';
// import { useEffect,useState } from 'react';
import { FC, useEffect, useRef,useState } from 'react'

import EditModal from '@/components/oneapi/EditModal'
import { renderFormTitle } from '@/components/TableColumns'
import { createToken, updateToken } from '@/services/llm/token'
import { isSuccess } from '@/utils'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/role-management'

import FormTemplateItem from './FormTemplateItem' // 表单组件 

const FormTemplate: FC<FormTemplateProps> = ({ reloadTable, open, setOpenDrawerFalse }) => {
	// hooks 调用
	const { message } = App.useApp();
	// 上下文表单实例
	const form = Form.useFormInstance()
	// 获取表单全部字段
	const { id, name, unlimited_quota } = form.getFieldsValue(true)
	const values = form.getFieldsValue(true)
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.TOKEN, id, name)

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}
	// const [groupOptions, setGroupOptions] = useState<string[]>([]);
	// const fetchGroups = async () => {
  //   try {
  //     const res = await getGroup();
  //     setGroupOptions(res.data.data);
  //   } catch (error) {
  //     message.error((error as any).message);
  //   }
  // };
	// useEffect(() => {
  //   fetchGroups().then();
  // }, []);

	// const childRef = useRef<any>()
	// 提交表单
	const handlerSubmit = async (values: API.TOKEN): Promise<void> => {
		// 获取子组件数据
    // const childForm = childRef.current.getForm()
		// const formikValues = await childRef.current.validateForm()
    // if (!formikValues)
		// 	return 


    // const data = childForm.getFieldsValue()
    // console.log(data)

		// alert(formikValues.models);
		// 提交数据
		await (id ? updateToken : createToken)({ ...values, id }).then(({ code, msg }) => {
			if (isSuccess(code)) {
				message.success(msg);
				// 刷新表格
				reloadTable()
				// 关闭浮层
				handlerClose()
			}
		})
	}
	return (
		<ModalForm<API.TOKEN>
			title={formTitle}
			width={800}
			grid
			form={form}
			open={open}
			autoFocusFirstInput
			modalProps={{
				maskClosable: false,
				onCancel: () => handlerClose(),
			}}
			// 提交数据时，禁用取消按钮的超时时间（毫秒）。
			submitTimeout={2000}
			onFinish={handlerSubmit}
		>
			<Space direction="vertical" style={{
      width: '100%',
    }}>
				<Alert style={{ width:'100%'
}} showIcon closable message="" description={'注意，令牌的额度仅用于限制令牌本身的最大额度使用量，实际的使用受到账户的剩余额度限制。'}
	type="info" /> 
{/* 角色名称 */}
			<FormTemplateItem values={values}/>
			</Space>
			{/* <EditModal channelId={id} groupOptions={groupOptions} ref={childRef}/> */}
		</ModalForm>
	);
};

export default FormTemplate