import { IsNumber } from "class-validator";

export class ItemQuantityDTO {
  /**
   * The number of units of the item
   * @example 10
   */
    @IsNumber()
    quantity: number;
  }