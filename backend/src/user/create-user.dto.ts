import { IsNotEmpty,IsNumber,IsString,MaxLength } from "class-validator";

export class CreateUserDto{


    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly name:string


    @IsNotEmpty()
    @IsString()
    readonly email:string

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly password:string

    @IsNotEmpty()
    @IsNumber()
    readonly phone:number

    @IsNotEmpty()
    @IsNumber()
    readonly address:string
}