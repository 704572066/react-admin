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

import { DeleteResponseDto, UpdateResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import type { SessionTypes } from '@/utils/types';

import {
  CreateUserManagementDto,
  ListDataSetManagementDto,
  ResponseUserManagementDto,
  SaveUserManagementDto,
  UpdateUserStatusDto,
} from './dto';
import { DataSetManagementService } from './gpt-dataset-management.service'; // UserManagement Service

/* swagger 文档 */
@ApiTags('AI 控制台-应用管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('ai-console/gpt-dataset-management')
export class GPTDataSetManagementController {
  constructor(private readonly datasetManagementService: DataSetManagementService) {}

  /**
   * @description: 获取用户管理列表
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseUserManagementDto })
  @ApiOperation({ summary: '获取用户管理列表' })
  async getUserList(@Query() userInfo: ListDataSetManagementDto) {
    const response = await this.datasetManagementService.getDataSetList(userInfo);
    return response;
  }

  /**
   * @description: 创建用户数据
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: CreateUserManagementDto })
  @ApiOperation({ summary: '创建用户数据' })
  async createUser(
    @Body() userInfo: SaveUserManagementDto,
    @Session() session: SessionTypes,
  ) {
    const response = await this.datasetManagementService.createUser(
      userInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新用户数据
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('/:user_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新用户数据' })
  async updateUser(
    @Param('user_id') user_id: string,
    @Body() userInfo: SaveUserManagementDto,
    @Session() session: SessionTypes,
  ) {
    const response = await this.datasetManagementService.updateUser(
      user_id,
      userInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 删除用户数据
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:user_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除用户数据' })
  async deleteUser(@Param('user_id') user_id: string) {
    const response = await this.datasetManagementService.deleteUser(user_id);
    return response;
  }

  /**
   * @description: 更新用户状态
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:user_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新用户状态' })
  async updateUserStatus(
    @Param('user_id') user_id: string,
    @Body() { status }: UpdateUserStatusDto,
  ) {
    const response = await this.datasetManagementService.updateUserStatus(
      user_id,
      status,
    );
    return response;
  }

}
