/*
 * @Description: XmwPermission Entity
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-28 17:23:20
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 16:55:47
 */
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { XmwRole } from '@/models/xmw_role.model';
import type { PermissionAttributes } from '@/utils/types/system';

@Table({ tableName: 'xmw_permission' })
export class XmwPermission
  extends Model<PermissionAttributes, PermissionAttributes>
  implements PermissionAttributes
{
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '权限id',
  })
  permission_id: string;

  //角色id
  @IsUUID(4)
  @ForeignKey(() => XmwRole)
  @Column({ type: DataType.UUID, comment: '角色id' })
  role_id: string;

  //菜单id
  @IsUUID(4)
  @Column({ type: DataType.UUID, comment: '菜单id' })
  menu_id: string;

  //菜单状态
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0,
  //   comment: '菜单状态（0:不过滤，1：过滤）',
  // })
  // menu_check: number;


  @BelongsTo(() => XmwRole)
  roleInfo: XmwRole;
}
