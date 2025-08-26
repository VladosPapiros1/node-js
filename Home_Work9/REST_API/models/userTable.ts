import {
    Table, Column, Model, DataType, HasMany, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript';
import { FileUpload } from './fileUploadTable';

interface UserCreationAttrs {
  username: string;
  email: string;
  passwordhash: string;
  salt: string;
  role: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    passwordhash!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    salt!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    role!: string;

    @HasMany(() => FileUpload)
    files!: FileUpload[];
}