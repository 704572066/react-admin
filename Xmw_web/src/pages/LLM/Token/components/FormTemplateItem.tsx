/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-22 14:43:45
 */
import { ProFormDateTimePicker,ProFormDigit, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import dayjs from 'dayjs';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { formatPerfix } from '@/utils'
import { INTERNATION, ROUTES } from '@/utils/enums'

const FormTemplateItem: FC<{ values: any }> = ({values}) => {

	const [isVisible, setIsVisible] = useState<boolean>(values.expired_time >= 0);

	const [isDisabled, setIsDisabled] = useState<boolean>(values.unlimited_quota);

	const [chatCacheEnabled] = useState<boolean>(false);




	useEffect(() => {
    setIsVisible(values.expired_time >= 0);
  }, [values.expired_time >= 0]);

	useEffect(() => {
    setIsDisabled(values.unlimited_quota);
  }, [values.unlimited_quota]);
	const { formatMessage } = useIntl();

	return (
		<>
			{/* 名称 */}
			<ProFormText
				name="name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: formatPerfix(ROUTES.TOKEN, 'name') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.TOKEN, 'name') })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[
					{ required: true, message: '' },
					{
						validator: (_, value) => {
							if (!value) {
								return Promise.reject(new Error(formatMessage({ id: INTERNATION.PLACEHOLDER }) +
									formatMessage({ id: formatPerfix(ROUTES.TOKEN, 'name') })))
							} else if (value.length < 2) {
								return Promise.reject(new Error(
									formatMessage({ id: formatPerfix(ROUTES.TOKEN, 'name.validator') })))
							}
							return Promise.resolve()
						},
					},
				]}
			/>
			{isVisible && <ProFormDateTimePicker fieldProps={{
          format: 'YYYY-MM-DD HH:mm:ss', // DatePicker 中显示的格式
        }} 
				convertValue={(value) => {
          // 将 Unix 时间戳转换为日期格式以便显示在 DatePicker 中
					if(typeof value === 'number' && value >= 0)
						return dayjs.unix(value);
					return value;
        }} 
				name='expired_time' label="过期时间" width={'md'} 
				transform={(value) => {
          // 将日期格式转换为unix时间戳以便存储在数据库中
          // alert(dayjs.unix(value));
					if(typeof value === 'number')
					// 	return dayjs.unix(value);
					// alert(value)
						return value;
					return dayjs(value).unix();
        }}/>
			}
			<ProFormSwitch fieldProps={{ checked:!isVisible,onChange: (value) => setIsVisible(!value)}} addonAfter="永不过期"/>
			<ProFormDigit
						
						disabled={isDisabled}
            label="额度"
            name="remain_quota"
						width={'md'}
            min={0}
						fieldProps={{addonAfter:'（等价金额：$-0.00）'}}
          />
			<ProFormSwitch name="unlimited_quota" transform={(value) => {
						return value ? true : false;
        }}
				fieldProps={{
				onChange: (value) => setIsDisabled(value)}} addonAfter="无限额度"/>

			{chatCacheEnabled && <ProFormSwitch name="chat_cache" addonAfter="是否开启缓存(开启后，将会缓存聊天记录，以减少消费)"/>}


			
		</>
	)
}
export default FormTemplateItem