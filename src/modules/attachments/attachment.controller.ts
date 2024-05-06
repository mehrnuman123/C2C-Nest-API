import {
  Controller, HttpStatus,
  Inject, Param, Put, Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from './attachments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseUtil } from 'src/util/reponse-util';
import { CODE } from 'src/constants';

@Controller('api/v1/upload')
export class AttachmentsController {
  @Inject(AttachmentsService)
  private readonly attachmentService: AttachmentsService;
  @Put('card/:userId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadedFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: number, 
    @Res() res,
  ) {
    try {  
      const location = await this.attachmentService.s3Upload(file, userId);
      const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, 'File uploaded Successfully');
      return res.status(resObj.CODE).json({ response: resObj, data: location });
    } catch (e) {
      console.log(e);
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR,CODE.ERROR,CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }
}
