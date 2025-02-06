import dotenv from "dotenv";

dotenv.config();

const databaseConfig = {
  development: {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    define: {
      logging: false,
    },
  },
  production: {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    define: {
      logging: false,
    },
  },
};

export default databaseConfig;
