/*
 * @Description: 导出路由
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 10:27:55
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-12 15:39:47
 */
import administrative from './administrative'; // 智能行政模块
import aiConsole from './aiConsole'; // AI控制台模块
import dashboard from './dashboard'; // 指示面板模块
import llm from './llm'; // 大模型管理
import personalCenter from './personalCenter'; // 个人中心模块
import setting from './system'; // 系统设置模块
import technicalDocument from './technicalDocument'; // 技术文档模块



export {
    setting, dashboard, administrative, llm, personalCenter, technicalDocument, aiConsole,
}