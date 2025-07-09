import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index';

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string[];
  createdAt: Date;
  updatedAt: Date | null;
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'role' | 'createdAt' | 'updatedAt'> {}
export class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string[];
  declare createdAt: Date;
  declare updatedAt: Date | null;
}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.JSON, defaultValue: ['USER'] },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: null },
  },
  { sequelize, tableName: 'users', timestamps: false },
);
