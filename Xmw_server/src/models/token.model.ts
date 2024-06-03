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
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

// import { XmwPermission } from '@/models/xmw_permission.model';
// import type { Status } from '@/utils/types';
import type { TokenAttributes } from '@/utils/types/llm';
@Table({ tableName: 'tokens' })
export class Token
  extends Model<TokenAttributes, TokenAttributes>
  implements TokenAttributes
{
  // @IsUUID(4)
  @PrimaryKey
  // @ForeignKey(() => XmwPermission)
  @Column({ type: DataType.BIGINT, allowNull: false, comment: '排序' })
  id: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  user_id: number;

  @Column({ type: DataType.STRING(48), allowNull: true, comment: '排序' })
  key: string;

  @Column({ type: DataType.STRING(200), allowNull: true, comment: '排序' })
  name: string;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  status: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  created_time: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  accessed_time: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  expired_time: number;

  @Column({ type: DataType.DOUBLE, allowNull: true, comment: '排序' })
  remain_quota: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  unlimited_quota: number;

  @Column({ type: DataType.BIGINT, allowNull: true, comment: '排序' })
  used_quota: number;

  @Column({ type: DataType.SMALLINT, allowNull: true, comment: '排序' })
  chat_cache: number;

}
