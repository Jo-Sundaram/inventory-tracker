import { Bind, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ItemDTO, UpdateItemDTO, ItemQuantityDTO } from './dto/item.dto';
import { Item } from './items.schema';
import { ItemsService } from './items.service';

@Controller('items')
@ApiTags('items')
export class ItemsController {
    constructor(private itemService: ItemsService){}

    @Post('create')
    @ApiCreatedResponse({
      description: 'The item has been successfully created.',
      type: ItemDTO,
    })
    @Bind(Res(), Body(new ValidationPipe))
    async addItem(res, body: ItemDTO) {
      const item = await this.itemService.createItem(body);
      res.status(HttpStatus.CREATED).send(item);
    }

    @Get()
    @ApiOkResponse({
      description: 'All item records retrieved.',
      type: [ItemDTO],
    })
    @Bind(Res())
    async findAll(res) {
      const items = await this.itemService.findAll();
      res.status(HttpStatus.OK).send(items);
    }

    @Get(':id')
    @ApiOkResponse({
      description: 'Successfully retrieved item record.',
      type: ItemDTO,
    })
    @Bind(Res(), Param())
    async findOne(res, params) {
      const item = await this.itemService.findOne(params.id);
      res.status(HttpStatus.OK).send(item);
    }

    @Patch(':id')
    @ApiOkResponse({
      description: 'Successfully updated item record.',
      type: ItemDTO,
    })
    @Bind(Res(), Param(), Body(new ValidationPipe))
    async updateItem(res, params, body: UpdateItemDTO) {
      const item = await this.itemService.updateItem(params.id, body);
      res.status(HttpStatus.OK).send(item);
    }

    @Patch(':id/add')
    @ApiOkResponse({
      description: 'Successfully added quantity to item record.',
      type: ItemDTO,
    })
    @Bind(Res(), Param(), Body(new ValidationPipe))
    async addToItem(res, params, body: ItemQuantityDTO) {
      const item = await this.itemService.add(params.id, body.quantity);
      res.status(HttpStatus.OK).send(item);
    }

    @Patch(':id/remove')
    @ApiOkResponse({
      description: 'Successfully removed quantity from item record.',
      type: ItemDTO,
    })
    @Bind(Res(), Param(), Body(new ValidationPipe))
    async removeFromItem(res, params, body: ItemQuantityDTO) {
      const item = await this.itemService.remove(params.id, body.quantity);
      res.status(HttpStatus.OK).send(item);
    }

    @Patch(':id/sell')
    @ApiOkResponse({
      description: 'Successfully sold quantity from item record.',
      type: ItemDTO,
    })
    @Bind(Res(), Param(), Body(new ValidationPipe))
    async sellFromItem(res, params, body: ItemQuantityDTO) {
      const item = await this.itemService.remove(params.id, body.quantity);
      res.status(HttpStatus.OK).send(item);
    }

    @Delete(':id')
    @ApiNoContentResponse({
      description: 'Successfully deleted item record.',
    })
    @Bind(Res(), Param())
    async delete(res, params){
        const item = await this.itemService.deleteItem(params.id);
        res.status(HttpStatus.NO_CONTENT).send(item);
    }

}
