import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorsFilter } from './shared/filters/error.filter';

const PORT = process.env.PORT || 3000;
const PREFIX = 'cosmos-odyssey-backend';
const DATABASE_URL = process.env.MONGODB_CONNECTION_STRING;
const apiName = 'Cosmos odysssey backend API';
const corsOrigin = process.env.CORS_ORIGIN;

async function bootstrap() {
  const appOptions = {
    cors: { origin: corsOrigin },
    logging: true,
  };
  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalFilters(new ErrorsFilter());
  app.setGlobalPrefix(`/${PREFIX}`);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Cosmos odyssey backend')
    .setDescription(apiName)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(`${PREFIX}/api`, app, document);

  try {
    await app.listen(PORT);

    Logger.log(`${apiName} starter successfully and running on port ${PORT}`);
    Logger.log(`${apiName} is connected to ${DATABASE_URL} database`);
  } catch (error) {
    Logger.error(`Could not start ${apiName}`, error);
  }
}
bootstrap();
