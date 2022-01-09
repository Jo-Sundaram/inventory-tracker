import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

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
}


export class UpdateItemDTO {
  @ApiProperty({
    description: 'The name of the item'
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The category of the item',
  })
  @IsString()
  @IsOptional()
  category: string;


  @ApiProperty({
    description: 'The initial quantity of the item in stock',
    default: 0
  })
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty({
    description: 'The price of the item'
  })
  @IsNumber()  
  @IsOptional()
  price: number;

  @ApiProperty({
    description: 'The number of units sold of this item',
    default: 0
  })
  @IsNumber()  
  @IsOptional()
  sold: number;
}

export class ItemQuantityDTO {
  @ApiProperty({
    description: 'The quantity of the item'
  })
  @IsNumber()
  quantity: Number;
}
