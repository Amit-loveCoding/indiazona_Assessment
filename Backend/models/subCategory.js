import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Category from './Category.js';

const SubCategory = sequelize.define('SubCategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: { // Make sure categoryId is defined
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,  // Disable automatic timestamp columns
});

// Association with Category
SubCategory.belongsTo(Category, { foreignKey: 'categoryId' });

export default SubCategory;
