import { Module } from "@nestjs/common";
import { BrandController } from "./brand.controller";
import { BrandService } from "./brand.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Brand } from "./brand.entity";
import { AttachmentsService } from "../attachments/attachments.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Brand]),
    ],
    controllers: [BrandController],
    providers: [BrandService, AttachmentsService],
})
export class BrandModule { }
