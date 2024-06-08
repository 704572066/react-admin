/*
 * @Description: 组织架构
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-24 11:16:36
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 14:54:44
 */
import { PageContainer,ProCard } from '@ant-design/pro-components'
import { App, Button, Card, Space } from 'antd'
import type { FC } from 'react';
import { useEffect, useState } from 'react'


import { getConfig, updateConfig } from '@/services/llm/register' // 组织管理接口
import  VanillaJSONEditor from './components/VanillaJSONEditor'


const Structure: FC = () => {
	// hooks 调用
	const { message } = App.useApp();
	const [id, setId] = useState('');
	const [content, setContent] = useState({
    json: {
    },
    text: undefined,
  });

	const fetchConfig = async () => {
    try {
      const res = await getConfig();
      setContent({json:res.data.value,text: undefined});
			setId(res.data.id)
    } catch (error) {
      message.error((error as any).message);
    }
  };
	useEffect(() => {
    fetchConfig().then();
  }, []);

	const saveConfig = async () => {
    try {
      const res = await updateConfig({id, value: JSON.parse(content.text as any)});
      // setContent({json:JSON.parse(res.data.value),text: undefined});
			message.info(res.msg);
    } catch (error) {
      message.error((error as any).message);
    }
  };


	// useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get('/api/config');
  //       setContent(response.data);
  //     } catch (error) {
  //       console.error('Error fetching configs:', error);
  //     }
  //   }
  //   fetchData();
  // }, []);



	return (
		<PageContainer header={{ title: null }}>
			 <Card style={{ height: 'calc(100vh - 200px)' }}> 
				<Space direction="vertical" style={{ display: 'flex' }}>
					<VanillaJSONEditor content={content} onChange={setContent}/>
					<Button type="primary" onClick={saveConfig}>更新</Button>
				</Space>
			</Card> 
		</PageContainer>
	)
}

export default Structure