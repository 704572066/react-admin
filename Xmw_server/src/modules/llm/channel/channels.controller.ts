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
import { ChannelsService } from './channels.service'; // RoleManagement Service
import {
  // CreateRoleManagementDto,
  EditChannelDto,
  ListChannelsDto,
  ResponseChannelDto,
  SaveChannelDto,
  UpdateChannelStatusDto,
} from './dto';

/* swagger 文档 */
@ApiTags('大模型-渠道管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('llm/channel')
export class ChannelController {
  constructor(private readonly channelsService: ChannelsService, 
    private readonly httpService: HttpService, 
  ) {}

  /**
   * @description: 获取渠道管理列表
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseChannelDto })
  @ApiOperation({ summary: '获取渠道管理列表' })
  async getChannelList(@Query() channelInfo: ListChannelsDto) {
    const response = await this.channelsService.getChannelList(channelInfo);
    return response;
  }

    /**
   * @description: 获取渠道
   * @author: guj
   */
    @UseGuards(AuthGuard('jwt'))
    @Get('/items/:id')
    @ApiOkResponse({ type: ResponseChannelDto })
    @ApiOperation({ summary: '获取渠道' })
    async getChannel(@Param('id') id: number) {
      const response = await this.channelsService.getChannel(id);
      return response;
    }

    /**
   * @description: 测试渠道
   * @author: 白雾茫茫丶
   */
    @UseGuards(AuthGuard('jwt'))
    @Get('/test/:id')
    @ApiOkResponse({ type: ResponseChannelDto })
    @ApiOperation({ summary: '测试渠道' })
    async testChannel(@Param('id') id: number, @Query('model') model: string) {
      const response = await this.httpService.get('/api/channel/test/'+id+'?model='+model).toPromise();
      return response;
    }

    /**
   * @description: 获取分组
   * @author: guj
   */
    @UseGuards(AuthGuard('jwt'))
    @Get('/group')
    @ApiOkResponse({ type: ResponseChannelDto })
    @ApiOperation({ summary: '获取分组' })
    async getGroup() {
      const response = await this.httpService.get('/api/group');
      return response;
    }

    

  /**
   * @description: 获取模型列表
   * @author: guj
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/models')
  @ApiOkResponse({ type: ResponseChannelDto })
  @ApiOperation({ summary: '获取模型列表' })
  async getModels() {
    const response = await this.httpService.get('/api/channel/models');
    return response;
  }

  /**
   * @description: 创建渠道
   * @author: guj
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: ResponseChannelDto })
  @ApiOperation({ summary: '创建渠道' })
  async createChannel(
    @Body() channelInfo: SaveChannelDto,
  ) {
    const response = await this.httpService.post('/api/channel',channelInfo);
    return response;
  }

  /**
   * @description: 更新渠道
   * @author: guj
   */
  @UseGuards(AuthGuard('jwt'))
  @Put()
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新角色数据' })
  async updateChannel(
    @Body() channelInfo: EditChannelDto,
  ) {
    const response = await this.httpService.put('/api/channel',channelInfo);
    return response;
  }

  /**
   * @description: 删除渠道
   * @author: guj
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除渠道' })
  async deleteRole(@Param('id') id: number) {
    const response = await this.channelsService.deleteChannel(id);
    return response;
  }

  /**
   * @description: 更新渠道状态
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新渠道状态' })
  async updateChannelStatus(
    @Param('id') id: number,
    @Body() { status }: UpdateChannelStatusDto,
  ) {
    const response = await this.channelsService.updateChannelStatus(
      id,
      status,
    );
    return response;
  }

    /**
   * @description: 更新渠道权重
   * @author: guj
   */
    @UseGuards(AuthGuard('jwt'))
    @Patch('/weight/:id')
    @ApiOkResponse({ type: UpdateResponseDto })
    @ApiOperation({ summary: '更新渠道权重' })
    async updateChannelWeight(
      @Param('id') id: number,
      @Body() { weight }: {weight:number},
    ) {
      const response = await this.channelsService.updateChannelWeight(
        id,
        weight,
      );
      return response;
    }

     /**
   * @description: 更新渠道优先级
   * @author: guj
   */
     @UseGuards(AuthGuard('jwt'))
     @Patch('/priority/:id')
     @ApiOkResponse({ type: UpdateResponseDto })
     @ApiOperation({ summary: '更新渠道优先级' })
     async updateChannelPriority(
       @Param('id') id: number,
       @Body() { priority }: {priority:number},
     ) {
       const response = await this.channelsService.updateChannelPriority(
         id,
         priority,
       );
       return response;
     }

}
