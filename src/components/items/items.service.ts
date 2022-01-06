import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './items.schema';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

    async create(item): Promise<Item> {
        const createdItem = new this.itemModel(item)
        return await createdItem.save();
    }

    async findAll(): Promise<Item[]> {
        return await this.itemModel.find().exec();
    }

    async findOne(id): Promise<Item> {
        return await this.itemModel.findOne({_id: id}).exec();
    }

    async update(id, updateBody): Promise<Item> {
        const item = await this.itemModel.findById(id);
        Object.assign(item, updateBody)
        return await item.save();
    }

    async delete(id): Promise<Item>{
        const item = this.itemModel.findById(id).exec();
        await this.itemModel.deleteOne({_id: id}).exec();
        return item;
    }

}
