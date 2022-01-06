import { IsString, IsNumber } from 'class-validator';

export class ItemDTO {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  quantity: number;
}