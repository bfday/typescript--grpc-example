import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from '@nestjs/microservices';
import {join} from 'path';

async function bootstrap() {

    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'hero',
            protoPath: join(__dirname, './hero/hero.proto'),
            url: 'localhost:3001',
        },
    });
    await app.listenAsync();

    /*const app = await NestFactory.create(AppModule);
    app.connectMicroservice(grpcClientOptions);

    await app.startAllMicroservicesAsync();
    await app.listen(3001);*/
}

bootstrap();
