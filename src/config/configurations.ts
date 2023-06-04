/* eslint-disable prettier/prettier */
export default () => ({
  PORT: process.env.PORT,
  DATABASE: {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    port: parseInt(`${process.env.DATABASE_PORT}`),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  JWT: {
    secret: process.env.JWT_SECRETKEY,
    expiresIn: process.env.JWT_EXPIRESIN,
  },
});
