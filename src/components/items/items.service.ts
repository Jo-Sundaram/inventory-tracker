import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument, ItemSchema } from './items.schema';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

    async createItem(item): Promise<ItemDocument> {
        item.price = Number(item.price.toFixed(2))
        const createdItem = new this.itemModel(item)
        return await createdItem.save();
    }

    async findAll(): Promise<ItemDocument[]> {
        return await this.itemModel.find().exec();
    }

    async findOne(id): Promise<ItemDocument> {
        const item = await this.itemModel.findOne({_id: id}).exec();
        return item;
    }

    async updateItem(id, updateBody): Promise<ItemDocument> {
        const item = await this.itemModel.findById(id);
        Object.assign(item, updateBody)
        return await item.save();
    }

    async add(id, quantity): Promise<ItemDocument> {
        const item = await this.itemModel.findOne({_id: id}).exec();
        item.quantity += quantity;
        return await item.save();
    }

    async remove(id, quantity): Promise<ItemDocument> {
        const item = await this.itemModel.findById(id);
        if (item.quantity < quantity){
            throw new HttpException(`Cannot remove more than existing quantity: ${item.quantity}`, HttpStatus.BAD_REQUEST);
        }
        item.quantity -= quantity;
        return await item.save();
    }


    async sell(id, quantity): Promise<ItemDocument> {
        const item = await this.itemModel.findById(id);
        if (item.quantity < quantity){
            throw new HttpException(`Cannot sell more than existing quantity: ${item.quantity}`, HttpStatus.BAD_REQUEST);
        }
        item.quantity -= quantity;
        item.sold += quantity;
        return await item.save();
    }


    async deleteItem(id): Promise<ItemDocument>{
        const item = this.itemModel.findById(id).exec();
        await this.itemModel.deleteOne({_id: id}).exec();
        return item;
    }
}
