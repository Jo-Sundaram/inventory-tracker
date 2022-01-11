import { IsNotEmpty, IsString, IsMongoId, IsIn } from "class-validator";
import { ActionEnum } from "./action-enum.dto";

export class ItemActionDTO {
  /**
   * The id of the item
   * @example 61dcc856fe334c08eb1ad605
   */
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    id: string;
  
  
    /**
     * The action performed on the item
     * @example add
     * @enum ActionEnum
     */
    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(ActionEnum))
    action: ActionEnum;
  }