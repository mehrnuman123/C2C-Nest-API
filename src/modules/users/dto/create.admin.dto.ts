import {
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength
} from 'class-validator';

export class CreateAdminDto {
    @IsNotEmpty({
        message: 'name is required',
    })
    name: string;

    @IsString({
        message: 'Email must be a string',
    })
    email: string;

    @IsString({
        message: 'profile must be a string',
    })
    profile: string;

    @IsString({
        message: 'company must be a string',
    })
    company: string;


    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;
}
