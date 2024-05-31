/*
 * @Description: XmwRole Entity
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-28 16:33:09
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:25:09
 */
import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

// import { XmwPermission } from '@/models/xmw_permission.model';
// import type { Status } from '@/utils/types';
import type { ChannelsAttributes } from '@/utils/types/llm';
@Table({ tableName: 'channels' })
export class Channels
  extends Model<ChannelsAttributes, ChannelsAttributes>
  implements ChannelsAttributes
{
  // @IsUUID(4)
  @PrimaryKey
  // @ForeignKey(() => XmwPermission)
  @Column({ type: DataType.BIGINT, allowNull: false, comment: '排序' })
  id: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  type: number;

  @Column({ type: DataType.TEXT, allowNull: true, comment: '排序' })
  key: string;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  status: number;

  @Column({ type: DataType.STRING(200), allowNull: true, comment: '排序' })
  name: string;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  weight: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  created_time: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  test_time: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  response_time: number;

  @Column({ type: DataType.STRING(200), allowNull: true, comment: '排序' })
  base_url: string;

  @Column({ type: DataType.TEXT, allowNull: true, comment: '排序' })
  other: string;

  @Column({ type: DataType.DOUBLE, allowNull: true, comment: '排序' })
  balance: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  balance_updated_time: number;

  @Column({ type: DataType.TEXT, allowNull: true, comment: '排序' })
  models: string;

  @Column({ type: DataType.STRING(32), allowNull: true, comment: '排序' })
  group: string;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  used_quota: number;

  @Column({ type: DataType.STRING(144), allowNull: true, comment: '排序' })
  model_mapping: string;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  priority: number;

  @Column({ type: DataType.STRING(255), allowNull: true, comment: '排序' })
  proxy: string;

  @Column({ type: DataType.STRING(50), allowNull: true, comment: '排序' })
  test_model: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true, comment: '排序' })
  only_chat: boolean;

  @Column({ type: DataType.JSON, allowNull: true, comment: '排序' })
  plugin: string;

  // @HasMany(() => XmwPermission, { as: 'menu_permission' })
  // models: string[];

}
