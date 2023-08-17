import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { user, userSchema } from './user.schema';
import {JwtModule} from '@nestjs/jwt';
import { jwtConstants } from 'src/strategy/constants';
import { HashService } from './hash.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { LocalStrategy } from 'src/strategy/local.strategy';
@Module({
  imports:[
    MongooseModule.forFeature([{name:user.name,schema:userSchema}]),
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{
        expiresIn:'7d'
      },
    })
  ],
  providers: [UserService,HashService,AuthService,JwtStrategy,LocalStrategy],
  controllers: [UserController]
})
export class UserModule {}
