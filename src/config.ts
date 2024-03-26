import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => {
  return {
    database: {
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      db: process.env.MONGO_DB,
      cluster: process.env.MONGO_CLUSTER,
    },
    email: {
      username: process.env.EMAIL,
      password: process.env.EMAIL_PASSWORD,
      port: process.env.EMAIL_PORT,
      host: process.env.EMAIL_HOST
    },
    tokens: {
      jwtSecret: process.env.JWT_SECRET,
      jwtSecretRecoverPassword: process.env.JWT_SECRET_RECOVER_PASSWORD,
    },
    appUrls: {
      urlChangePassword: process.env.URL_CHANGE_PASSWORD,
    },
  };
});
