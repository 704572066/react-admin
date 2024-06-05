/*
 * @Description: RoleManagement Controller
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-28 17:39:08
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:01:39
 */
import { HttpService } from '@nestjs/axios';
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
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'; // swagger 接口文档

import { DeleteResponseDto, UpdateResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import type { SessionTypes } from '@/utils/types';

import {
  // CreateRoleManagementDto,
  EditTokenDto,
  ListTokenDto,
  ResponseTokenDto,
  SaveTokenDto,
  UpdateTokenStatusDto,
} from './dto';
import { TokenService } from './token.service'; // RoleManagement Service

/* swagger 文档 */
@ApiTags('大模型-令牌管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('llm/token')
export class TokenController {
  constructor(private readonly tokenService: TokenService, 
    private readonly httpService: HttpService, 
  ) {}

  /**
   * @description: 获取令牌列表
   * @author: guj
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseTokenDto })
  @ApiOperation({ summary: '获取令牌列表' })
  async getTokenList(@Query() tokenInfo: ListTokenDto) {
    const response = await this.tokenService.getTokenList(tokenInfo);
    return response;
  }

    /**
   * @description: 获取令牌
   * @author: guj
   */
    @UseGuards(AuthGuard('jwt'))
    @Get('/items/:id')
    @ApiOkResponse({ type: ResponseTokenDto })
    @ApiOperation({ summary: '获取令牌' })
    async getToken(@Param('id') id: number) {
      const response = await this.tokenService.getToken(id);
      return response;
    }

   
  /**
   * @description: 创建令牌
   * @author: guj
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: ResponseTokenDto })
  @ApiOperation({ summary: '创建令牌' })
  async createToken(
    @Body() tokenInfo: SaveTokenDto,
  ) {
    const response = await this.httpService.post('/api/token',tokenInfo);
    return response;
  }

  /**
   * @description: 更新令牌
   * @author: guj
   */
  @UseGuards(AuthGuard('jwt'))
  @Put()
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新令牌' })
  async updateToken(
    @Body() tokenInfo: EditTokenDto,
  ) {
    const response = await this.httpService.put('/api/token',tokenInfo);
    return response;
  }

  /**
   * @description: 删除渠道
   * @author: guj
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除令牌' })
  async deleteToken(@Param('id') id: number) {
    const response = await this.tokenService.deleteToken(id);
    return response;
  }

  /**
   * @description: 更新渠道状态
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新令牌状态' })
  async updateTokenStatus(
    @Param('id') id: number,
    @Body() { status }: UpdateTokenStatusDto,
  ) {
    const response = await this.tokenService.updateTokenStatus(
      id,
      status,
    );
    return response;
  }

}
