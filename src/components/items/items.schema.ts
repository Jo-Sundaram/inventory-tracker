import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  category: string;

  @Prop({required: true})
  quantity: number;

  @Prop({required: true})
  price: Number;

  @Prop({required: true, default: 0})
  sold: Number;

  @Prop({required: false})
  outOfStock: Boolean;

  @Prop({required: false, default:Date.now })
  created_at: Date;

}


export const ItemSchema = SchemaFactory.createForClass(Item);


// export const ItemSchema = new mongoose.Schema({
//   name: {type: String, required: true},
//   category: {type: String, required: true},
//   quantity: {type: Number, required: false, default: 0},
//   price: {type: Number, required: true},

//   sold: {type: Number, required: false, default: 0},

//   outOfStock: {type: Boolean, required: false, 
//     default: function() {
//     return(this.quantity==0);
//     }
//   },
//   created_at: { type: Date, default: Date.now }
// });

// export const Item = mongoose.model("Item", ItemSchema);

// // export type ItemDocument = typeof Item;


// export interface ItemDocument extends Document {
//   name: String;
//   category: String;
//   quantity: Number;
//   price: Number;
//   sold: Number;
//   outOfStock: Boolean;
//   created_at: Date;
// }