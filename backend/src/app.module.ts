import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {MongooseModule} from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule,MongooseModule.forRoot('mongodb://127.0.0.1:27017/banod'),AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
