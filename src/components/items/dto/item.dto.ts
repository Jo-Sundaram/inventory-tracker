import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ItemDTO {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsNumber()  
  price: number;

  @IsNumber()  
  @IsOptional()
  sold: number;
}


export class UpdateItemDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsNumber()  
  @IsOptional()
  price: number;

  @IsNumber()  
  @IsOptional()
  sold: number;
}

export class ItemQuantityDTO {
  @IsNumber()
  quantity: Number;
}
