import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { CardModule } from './modules/card/card.module';
import { UsersModule } from './modules/users/users.module';
import { AttachmentModule } from './modules/attachments/attachments.module';
import { BrandModule } from './modules/brands/brand.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    CardModule,
    AttachmentModule,
    BrandModule

  ],
})
export class AppModule {}
