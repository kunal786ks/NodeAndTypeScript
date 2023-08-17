import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "src/user/hash.service";

@Injectable()
export class AuthService{
    constructor(private usersService:UserService,
        private hashService:HashService,
        private jwtService:JwtService){}
    async validateUser(email:string,pass:string):Promise<any>{
        const user=await this.usersService.getUser(email,pass)
        if(user && (await this.hashService.comparePassword(pass,user.password))){
            return user;
        }
        return null;
    }
    async login(user: any) {
        const payload = {
          email: user.email,
          sub: user.password
        };
        return {
          user,
          access_token: this.jwtService.sign(payload),
        };
      }
}