import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({
  toJSON: {
    getters: false,
    versionKey: false
  },
})
export class Item {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  category: string;

  @Prop({required: false, default:0})
  quantity: number;

  @Prop({required: true})
  price: Number;

  @Prop({required: true, default: 0})
  sold: Number;

  @Prop({required: true, default: false})
  inStock: Boolean;
  
  @Prop({required: false, default: Date.now })
  created_at: Date;
  
  checkStock: () => Boolean;

}


export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.methods.checkStock = function(this: Item){
  this.inStock = this.quantity > 0;
  return this.inStock;
}

