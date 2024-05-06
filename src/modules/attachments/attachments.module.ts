import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttachmentsController } from "./attachment.controller";
import { AttachmentsService } from "./attachments.service";

@Module({
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
})
export class AttachmentModule {}
