import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';
import { RedisClient } from './shared/redis';

//handling uncaught exception
process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    RedisClient.connect();
    // await mongoose.connect('mongodb://127.0.0.1:27017/university-management');
    await mongoose.connect(config.database_url as string);
    logger.info(`✅ Dtabase is connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`🦻 Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`❌ Failed to connect database: ${error}`);
  }

  //gracefully off/terminate the server
  process.on('unhandledRejection', error => {
    // eslint-disable-next-line no-console
    console.log('Unhandled rejection detected, we are closing our server...');
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
