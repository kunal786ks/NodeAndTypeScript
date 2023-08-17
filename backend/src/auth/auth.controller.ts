import { AuthService } from "./auth.service";
import { Controller,Request,UseGuards,Post,Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import { HashService } from "src/user/hash.service";
@Controller('auth')
export class AuthController{
    constructor(private authservice:AuthService,
        private usersService:UserService,
        private hashService:HashService){}

    @Post('/login')
    // @UseGuards(AuthGuard('local'))
    async login(@Body() req){
        console.log(req)
        const user=await this.usersService.getUser(req.email,req.password)
        
        if(user){
            return this.authservice.login(user)
        }
        return null;
    }
}