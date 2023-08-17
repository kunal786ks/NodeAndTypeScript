import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import {MongooseModule} from '@nestjs/mongoose';
import { user,userSchema } from "src/user/user.schema";
import {JwtModule} from "@nestjs/jwt"
import { jwtConstants } from "src/strategy/constants";
import { UserService } from "src/user/user.service";
import { HashService } from "src/user/hash.service";
import { LocalStrategy } from "src/strategy/local.strategy";

@Module({
    imports:[
        MongooseModule.forFeature([{name:user.name,schema:userSchema}]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
              expiresIn: '7d'
            },
          }),
    ],
    controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, HashService],
})

export class AuthModule{}