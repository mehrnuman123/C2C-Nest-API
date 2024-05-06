import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ResponseUtil } from 'src/util/reponse-util';
import { CODE, DESCRIPTION } from 'src/constants';
import { CreateAdminDto } from './dto/create.admin.dto';
import { log } from 'console';

@Controller('api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/signup')
  @ApiOperation({
    summary: 'Sign Up as a user',
  })
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      const userEmail = await this.usersService.findByEmail(createUserDto.email);
      if (userEmail) {
        const resObj = new ResponseUtil(HttpStatus.NOT_ACCEPTABLE, CODE.ERROR, DESCRIPTION.EMAIL_ALREADY_EXIST);
        return res.status(resObj.CODE).json({ response: resObj });
      }
      else {
        const user = await this.usersService.registerUser(createUserDto);
        const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.USER_CREATED_SUCCESSFULLY);
        return res.status(resObj.CODE).json({ response: resObj, data: user });
      }
    }
    catch (e) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }

  @Post('/signup/admin')
  @ApiOperation({
    summary: 'Sign Up as a Admin',
  })
  @UsePipes(ValidationPipe)
  async createAdmin(@Body() createAdminDto: CreateAdminDto, @Res() res) {
    try {
      const userEmail = await this.usersService.findByEmail(createAdminDto.email);
      if (userEmail) {
        const resObj = new ResponseUtil(HttpStatus.NOT_ACCEPTABLE, CODE.ERROR, DESCRIPTION.EMAIL_ALREADY_EXIST);
        return res.status(resObj.CODE).json({ response: resObj });
      }
      else {
        const user = await this.usersService.registerAdmin(createAdminDto);
        const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.USER_CREATED_SUCCESSFULLY);
        return res.status(resObj.CODE).json({ response: resObj, data: user });
      }
    }
    catch (e) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req, @Res() res) {
    try {
      console.log(req.user);
      
      const usr = await this.usersService.findById(req.user.id);
      const user = {
        id: usr.id,
        name: usr.name,
        email: usr.email,
        auth_provider: usr.auth_provider ? usr.auth_provider : null,
        phoneNumber: usr.phoneNumber ? usr.phoneNumber : null,
        avatar: usr.profile ? usr.profile : null,
      }
      const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.USER_PROFILE);
      return res.status(resObj.CODE).json({ response: resObj, data: user });
    }
    catch (e) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }
}
