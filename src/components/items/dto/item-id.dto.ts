import { IsNotEmpty, IsString, IsMongoId } from "class-validator";

export class ItemIdDTO{
  /**
   * The id of the item
   * @example 61dcc856fe334c08eb1ad605
   */
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    id: string;
  }