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
import type { AbilitiesAttributes } from '@/utils/types/llm';
@Table({ tableName: 'abilities' })
export class Abilities
  extends Model<AbilitiesAttributes, AbilitiesAttributes>
  implements AbilitiesAttributes
{

  @Column({ type: DataType.STRING(32), allowNull: true, comment: '排序' })
  group: string;

  @Column({ type: DataType.STRING(200), allowNull: true, comment: '排序' })
  model: string;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  channel_id: number;

  @Column({ type: DataType.SMALLINT, allowNull: true, comment: '排序' })
  enabled: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  priority: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  weight: number;

}
