import { Controller,Body,Post,Res,HttpStatus,Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import {AuthGuard} from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt';
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService,
        private jwtService:JwtService){}
   
    @Post('adduser')
    async CreateUser(@Res() Response,@Body() createUser:CreateUserDto){
        try{
            const newUser=await this.userService.CreateNewUser(createUser)
            const payload={
                name:newUser.name,
                email:newUser.email,
            }
            const token=this.jwtService.sign(payload)
            return Response.status(HttpStatus.OK).json({
                success:true,
                message:'New user created Successfully',
                newUser,
                token
            })
        }catch(err){
            return Response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Student not created!',
                error: 'Bad Request'
             });
        }
    }
    @Get('login')
    // @UseGuards(AuthGuard('jwt'))
    async Login(@Res() Response,@Body() CreateUser){
        try{
            const loggedIn=await this.userService.getUser(CreateUser.email,CreateUser.password)
            console.log(CreateUser)
            return Response.status(HttpStatus.OK).json({
                success:true,
                message:'Logged in successfully'
            })
        }catch(err){
            return Response.status(HttpStatus.BAD_REQUEST).json(err.message);
        }
    }
}
