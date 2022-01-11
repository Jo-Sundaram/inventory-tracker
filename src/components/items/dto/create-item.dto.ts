import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean} from 'class-validator';

export class ItemDTO {
  /**
   * The name of the item
   * @example 'Chair'
   */
  @IsString()
  name: string;

  /**
   * The category of the item
   * @example 'Furniture'
   */
  @IsString()
  category: string;

  /**
   * The number of units in stock
   * @example 10
   */
  @IsNumber()
  @IsOptional()
  quantity?: number;

  /**
   * The price of a single item unit
   * @example 10.99
   */
  @IsNumber()  
  price: number;

  /**
   * The number of units sold
   * @example 3
   */
  @IsNumber()  
  @IsOptional()
  sold?: number;

  /**
   * Indicates whether this item is in stock
   * @example 'true'
   */
  @IsBoolean()  
  @IsOptional()
  inStock?: boolean;
}











