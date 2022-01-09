import { Bind, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, ValidationPipe } from '@nestjs/common';
import { ItemDTO, UpdateItemDTO, ItemQuantityDTO } from './dto/item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemsService){}

    @Post('create')
    @Bind(Res(), Body(new ValidationPipe))
    async addItem(res, body: ItemDTO) {
      const item = await this.itemService.createItem(body);
      res.status(HttpStatus.CREATED).send(item);
    }

    @Get()
    @Bind(Res())
    async findAll(res) {
      const items = await this.itemService.findAll();
      res.status(HttpStatus.OK).send(items);
    }

    @Get(':id')
    @Bind(Res(), Param())
    async findOne(res, params) {
      const item = await this.itemService.findOne(params.id);
      res.status(HttpStatus.OK).send(item);
    }

    @Patch(':id')
    @Bind(Res(), Param(), Body(new ValidationPipe))
    async updateItem(res, params, body: UpdateItemDTO) {
      const item = await this.itemService.updateItem(params.id, body);
      res.status(HttpStatus.OK).send(item);
    }

    @Patch(':id/add')
    @Bind(Res(), Param(), Body(new ValidationPipe))
    async addToItem(res, params, body: ItemQuantityDTO) {
      const item = await this.itemService.add(params.id, body.quantity);
      res.status(HttpStatus.OK).send(item);
    }

    @Patch(':id/remove')
    @Bind(Res(), Param(), Body(new ValidationPipe))
    async removeFromItem(res, params, body: ItemQuantityDTO) {
      const item = await this.itemService.remove(params.id, body.quantity);
      res.status(HttpStatus.OK).send(item);
    }

    @Patch(':id/sell')
    @Bind(Res(), Param(), Body(new ValidationPipe))
    async sellFromItem(res, params, body: ItemQuantityDTO) {
      const item = await this.itemService.remove(params.id, body.quantity);
      res.status(HttpStatus.OK).send(item);
    }

    @Delete(':id')
    @Bind(Res(), Param())
    async delete(res, params){
        const item = await this.itemService.deleteItem(params.id);
        res.status(HttpStatus.NO_CONTENT).send(item);
    }

}
