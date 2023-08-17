import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class user{

    @Prop()
    name:string
    
    @Prop()
    email:string


    @Prop()
    password:string

    @Prop()
    phone:number

    @Prop()
    address:string
}

export type userDocument=user & Document

export const userSchema=SchemaFactory.createForClass(user);