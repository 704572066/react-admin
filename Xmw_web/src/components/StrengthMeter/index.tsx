/*
 * @Description: 密码强度校验组件
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-09 17:15:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-14 09:40:25
 */
import { ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { Col, Form, Progress, Row } from 'antd';
import { keys, values } from 'lodash-es'
import type { FC } from 'react'
import zxcvbn from 'zxcvbn'; // 密码强度校验

import { formatPerfix } from '@/utils'
import { INTERNATION, ROUTES } from '@/utils/enums'

import { strengthMeterOptions } from './config'
import styles from './index.module.less'

interface PropsType {
  allowEmptyPassword?: boolean
}

const StrengthMeter: FC<PropsType> = ({allowEmptyPassword = false}) => {
  const { formatMessage } = useIntl();
  // 获取上下文 form 实例
  const form = Form.useFormInstance();
  // 监听密码的改变
  const password = Form.useWatch('password', form);
  /**
   * @description: 监听密码强度相应变化
   * @param {string} password
   * @author: 白雾茫茫丶
   */
  const watchStrength = (password: string): number => {
    const analysisValue = zxcvbn(password)
    // score得分只有0~4，且只有整数范围并没有小数
    return (analysisValue.score + 1) * 20
  }
  // 定义输入密码时的回调事件
  // const passWordChange: any = () => {
  //   const confirmPasswordValue = form.getFieldValue('confirmPassword') // 获取确认密码的值
  //   if (confirmPasswordValue) {
  //       form.validateFields(['confirmPassword']);// 使用form.validateFields（），一个参数时校验某一项，若不传参则校验全部
  //   }
  // }

  return (
    <>
      {/* 密码 */}
      <ProFormText.Password
        label={formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.password` })}
        name="password"
        rules={[
          {
            required: !password && allowEmptyPassword ? false : true, min: 6, max: 12,
            message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
              formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.password.rules` }),
          },
        ]}
      />
      {/* 确认密码 */}
      <ProFormText.Password
        label={formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.confirm-password` })}
        name="confirmPassword"
        fieldProps={{ visibilityToggle: false }}
        rules={[
          {
            required: !password && allowEmptyPassword ? false : true,
            message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
              formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.confirm-password` }),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(
                formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.confirm-password.rules` })));
            },
          }),
        ]}
      />
      {/* 显示密码强度 */}
      <div className={styles['process-steps']}>
        <Progress
          percent={password ? watchStrength(password) : 0}
          steps={5}
          strokeColor={values(strengthMeterOptions)}
          showInfo={false}
        />
      </div>
      <Row justify="space-around" className={styles['process-steps']}>
        {
          keys(strengthMeterOptions).map((value: string) =>
            <Col span={4} key={value}>{formatMessage({ id: `components.StrengthMeter.${value}` })}</Col>)
        }
      </Row>
    </>
  )
}

export default StrengthMeter