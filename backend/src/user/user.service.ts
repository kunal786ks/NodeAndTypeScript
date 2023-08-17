import { Injectable,NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { user } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { HashService } from './hash.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectModel(user.name) private userModel:Model<user>,
    private hashservice:HashService){}


    async CreateNewUser(createUser:CreateUserDto):Promise<user>{
        const newUser=await new this.userModel(createUser);
        const salt=10;
        const hashepassowrd=await bcrypt.hash(newUser.password,salt)
        newUser.password=hashepassowrd
        return newUser.save();
    }

    async getUser(email:string,password:string):Promise<user>{
        console.log(email)
        const existingUser=await this.userModel.findOne({email}).exec()
        console.log(existingUser)
        if(!existingUser){
            throw new NotFoundException(`user with ${email} not exists`)
        }
        console.log(password,existingUser.password)
        // let acess=await this.hashservice.comparePassword(password,existingUser.password)
        let acess=await bcrypt.compare(password,existingUser.password)
        console.log(acess)
        if(!acess){
            throw new NotFoundException(`password incorrect`)
        }
        return existingUser;
    }
}
