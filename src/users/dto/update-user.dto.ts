import { IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator"

export class Avatar{

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    url: string

    @IsString()
    @IsNotEmpty()
    filename: string
}

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    about: string
    
    @IsOptional()
    @ValidateNested()
    avatar: Avatar
}