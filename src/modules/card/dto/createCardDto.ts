import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNumber()
  public ownerId: number;
  @IsNumber()
  public serialNumber: string;

  @IsNumber()
  public manufacturar: string;

  @IsNumber()
  public pin: number

  @IsNumber()
  public userId: number

  @IsString()
  public expiry: string

  @IsNumber()
  public balance: number;

  @IsString()
  public category: string;

  @IsString()
  public photoUrl: string;

  @IsString()
  public type: string;

  @IsBoolean()
  public isActive: boolean;

  @IsBoolean()
  public isListed: boolean;
}
