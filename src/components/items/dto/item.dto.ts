import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, Min, Length, IsEmpty, IsNotEmpty, IsAlphanumeric, IsMongoId, IsIn } from 'class-validator';

export class ItemDTO {
  @ApiProperty({
    description: 'The name of the item'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The category of the item',
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'The initial quantity of the item in stock',
    required: false,
    default: 0
  })
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty({
    description: 'The price of the item'
  })
  @IsNumber()  
  price: number;

  @ApiProperty({
    description: 'The number of units sold of this item',
    default: 0
  })
  @IsNumber()  
  @IsOptional()
  sold: number;

  @ApiProperty({
    description: 'Whether this item is out of stock (quantity > 0)'
  })
  @IsBoolean()  
  @IsOptional()
  inStock: Boolean;
}


export class UpdateItemDTO {
  @ApiProperty({
    description: 'The name of the item',
    required: false
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The category of the item',
    required: false
  })
  @IsString()
  @IsOptional()
  category: string;


  @ApiProperty({
    description: 'The initial quantity of the item in stock',
    default: 0,
    required: false
  })
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty({
    description: 'The price of the item',
    required: false
  })
  @IsNumber()  
  @IsOptional()
  price: number;

  @ApiProperty({
    description: 'The number of units sold of this item',
    default: 0,
    required: false
  })
  @IsNumber()  
  @IsOptional()
  sold: number;

  @ApiProperty({
    description: 'Whether this item is out of stock (quantity == 0)',
    required: false
  })
  @IsBoolean()  
  @IsOptional()
  outOfStock: Boolean;
}

export class ItemQuantityDTO {
  @ApiProperty({
    description: 'The quantity of the item'
  })
  @IsNumber()
  quantity: Number;
}

export class ItemIdDTO{
  @ApiProperty({
    description: 'The id of the item'
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  id: String;
}

export enum ActionEnum {
  add = "add",
  remove = "remove",
  sell = "sell"
}
export class ItemActionDTO{
  @ApiProperty({
    description: 'The id of the item'
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  id: String;

  @ApiProperty({
    description: 'Action to perform on the item'
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(ActionEnum))
  action: ActionEnum
}

