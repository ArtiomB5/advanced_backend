import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidatorPipe } from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT || 6000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Advanced Backend')
        .setDescription('Advanced Backend UlbiTV course')
        .setVersion('0.1')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    app.useGlobalPipes(new ValidatorPipe())

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start();