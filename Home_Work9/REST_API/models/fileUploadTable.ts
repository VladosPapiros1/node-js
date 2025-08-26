// models/FileUpload.ts

import {
    Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript';
import { User } from './userTable';

@Table({ tableName: 'uploads' })
export class FileUpload extends Model<FileUpload> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    fileName!: string;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}
