import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

const sequelize = new Sequelize(
  process.env.DB_NAME,    // Database name
  process.env.DB_USER,    // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);


export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

export { sequelize };