/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-08 09:14:05
 */

import { ModalForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
<<<<<<< HEAD
// import type { FC } from 'react';
// import { useEffect,useState } from 'react';
import { FC, useEffect, useState, useRef } from 'react'
import { useFormik } from 'formik'
import EditModal from '@/components/oneapi/EditModal'
import { renderFormTitle } from '@/components/TableColumns'
import { createChannel, getGroup, updateChannel } from '@/services/llm/channel'
=======
import type { FC } from 'react';
import { useEffect,useState } from 'react';

import EditModal from '@/components/oneapi/EditModal'
import { renderFormTitle } from '@/components/TableColumns'
import { createChannel, updateChannel } from '@/services/llm/channel'
>>>>>>> 91e1fa8919f5389fdff1d575925d93b73b05f2c4
import { isSuccess } from '@/utils'
import { ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/system/role-management'

// import FormTemplateItem from './FormTemplateItem' // 表单组件 

const FormTemplate: FC<FormTemplateProps> = ({ reloadTable, open, setOpenDrawerFalse }) => {
	// hooks 调用
	const { message } = App.useApp();
	// 上下文表单实例
	const form = Form.useFormInstance()
	// 获取表单全部字段
	const { id, name } = form.getFieldsValue(true)
	// 渲染标题
	const formTitle = renderFormTitle(ROUTES.CHANNEL, id, name)

	// 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单
		setOpenDrawerFalse()
		// 重置表单
		form.resetFields();
	}
	const [groupOptions, setGroupOptions] = useState<string[]>([]);
<<<<<<< HEAD
	const fetchGroups = async () => {
    try {
      const res = await getGroup();
      setGroupOptions(res.data.data);
    } catch (error) {
      message.error((error as any).message);
    }
  };
	useEffect(() => {
    fetchGroups().then();
  }, []);
=======
	// const fetchGroups = async () => {
  //   try {
  //     // const res = await API.get(`/api/group/`);
  //     setGroupOptions(['a','b']);
  //   } catch (error) {
  //     message.error('error.message');
  //   }
  // };

>>>>>>> 91e1fa8919f5389fdff1d575925d93b73b05f2c4

	const childRef = useRef<any>()
	// 提交表单
	const handlerSubmit = async (values: API.CHANNEL): Promise<void> => {
<<<<<<< HEAD
		// 获取子组件数据
    // const childForm = childRef.current.getForm()
		const formikValues = await childRef.current.validateForm()
    if (!formikValues)
			return 


    // const data = childForm.getFieldsValue()
    // console.log(data)

		// alert(formikValues.models);
		// 提交数据
		await (id ? updateChannel : createChannel)({ ...formikValues, models: formikValues.modelsStr,id }).then(({ code, msg }) => {
=======
		// 提交数据
		await (id ? updateChannel : createChannel)({ ...values, id }).then(({ code, msg }) => {
>>>>>>> 91e1fa8919f5389fdff1d575925d93b73b05f2c4
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
		<ModalForm<API.CHANNEL>
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
			{/* <FormTemplateItem /> */}
<<<<<<< HEAD
			<EditModal channelId={id} groupOptions={groupOptions} ref={childRef}/>
=======
			<EditModal channelId={id} groupOptions={groupOptions}/>
>>>>>>> 91e1fa8919f5389fdff1d575925d93b73b05f2c4
		</ModalForm>
	);
};

export default FormTemplate