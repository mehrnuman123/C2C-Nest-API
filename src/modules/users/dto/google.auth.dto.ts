import { IsEmail, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
export class RegisterUserDto {
  @IsString()
  public readonly name: string;

  @IsEmail()
  public readonly email: string;

  @IsNumber()
  @IsOptional()
  public readonly phoneNumber: number;

  @IsString()
  public readonly role;

  @IsString()
  public readonly uid;

  @IsString()
  @IsOptional()
  public readonly profile: string;

  @IsString()
  public readonly auth_provider: string;

  @IsBoolean()
  @IsOptional()
  public readonly isVerified: boolean;
}


export class LoginDto {
  @IsString()
  public readonly email: string;
  @IsString()
  public readonly uId: string;
}

export class forgetPasswordDto {
  @IsEmail()
  public readonly email: string;
}

export class updatePasswordDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}
