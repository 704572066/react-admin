/*
 * @Description: UserManagement Controller
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-09 17:43:51
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:10:38
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

import { UpdateResponseDto } from '@/dto/response.dto'; // 响应体 Dto

import {
  CreateUserManagementDto,
  UpdateRegisterDto,
} from './dto';
import { RegisterService } from './register.service'; // UserManagement Service

/* swagger 文档 */
@ApiTags('大模型-配置管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: '配置管理',
})
@ApiBearerAuth()
@Controller('llm/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  /**
   * @description: 获取配置数据
   * @author: guj
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: CreateUserManagementDto })
  @ApiOperation({ summary: '创建配置数据' })
  async getConfig(
  ) {
    const response = await this.registerService.getConfig();
    return response;
  }

  /**
   * @description: 更新用户数据
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新配置数据' })
  async updateGPTUser(
    @Body() configInfo: UpdateRegisterDto,
  ) {
    const response = await this.registerService.updateConfig(
      configInfo.id,
      configInfo.value,
    );
    return response;
  }

}
