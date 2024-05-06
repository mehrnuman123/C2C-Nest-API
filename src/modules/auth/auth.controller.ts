import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  Body,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { RegisterUserDto } from '../users/dto/google.auth.dto';
import { CODE, DESCRIPTION } from 'src/constants';
import { ResponseUtil } from 'src/util/reponse-util';


@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({
    summary: 'Login/register as a google user or ios user',
  })
  @Put('/register/google-user')
  private async registerUser(@Body() body: RegisterUserDto, @Res() res) {
    try {
        const uid = body.uid;
        const usr = await this.authService.checkIfUserAlreadyExistAndUpdate(uid, body);  
        if (!usr) {
          const user = await this.authService.registerGoogleAuth(body);
          const jwtAuth = await this.authService.login(user)
          const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.USER_CREATED_SUCCESSFULLY);
          return res.status(resObj.CODE).json({ response: resObj, jwtToken: jwtAuth.token, data: user  });
        }
        else{
          const jwtAuth = await this.authService.login(usr)
          const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.USER_ALREADY_REGISTERED);
          return res.status(resObj.CODE).json({ response: resObj,jwtToken: jwtAuth.token, data: usr });
        }
    } catch (e) {  
      console.log(e);        
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }

  @ApiOperation({
    summary: 'Login as a user',
  })
  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    return await this.authService.login(req.user);
  }
}
