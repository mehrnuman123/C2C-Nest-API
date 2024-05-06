import { Body, Controller, Get, HttpStatus, Inject, Param, Put, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { AttachmentsService } from "../attachments/attachments.service";
import { ResponseUtil } from "src/util/reponse-util";
import { CODE, DESCRIPTION } from "src/constants";
import { Brand } from "./brand.entity";

@Controller('api/v1/brand')
export class BrandController {
    @Inject(BrandService)
    private readonly brandService: BrandService;
    @Inject(AttachmentsService)
    private readonly attchmentService: AttachmentsService

    @Put('/data')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    public async uploadedFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() data,
        @Res() res,
    ) {
        try {
            const location = await this.attchmentService.s3Upload(file, data);
            const brand = await this.brandService.saveBrandData(location, data)
            const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.BRAND_ADDED);
            return res.status(resObj.CODE).json({ response: resObj, data: brand });
        } catch (e) {
            console.log(e);
            const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
            return res.status(resObj.CODE).json({ response: resObj });
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    public async getRegisteredBrands( @Res() res) {
        try {
            const brand: Brand[]= await this.brandService.getAll()
            const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS,DESCRIPTION.BRAND_ALL);
            return res.status(resObj.CODE).json({ response: resObj, data: brand });
        } catch (e) {
            console.log(e);
            const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
            return res.status(resObj.CODE).json({ response: resObj });
        }
    }
}