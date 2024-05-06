import { IsNumber } from 'class-validator';

export class PutCardForSale {
  @IsNumber()
  public sellingPrice: number;
  @IsNumber()
  public geotag: number;
  @IsNumber()
  public discount:  number;
  @IsNumber()
  public master_commision: number;
  @IsNumber()
  public youWillGet: number;

}
