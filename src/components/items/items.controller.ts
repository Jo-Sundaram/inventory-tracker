import { Bind, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req, Res, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ItemDTO } from './dto/create-item.dto';
import { ItemActionDTO } from './dto/item-action.dto';
import { ItemIdDTO } from './dto/item-id.dto';
import { ItemQuantityDTO } from './dto/item-quantity.dto';
import { QueryItemDTO } from './dto/query-item.dto';
import { UpdateItemDTO } from './dto/update-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
@ApiTags('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService){}

    /**
     * Create an item
     */
    @ApiCreatedResponse({
      description: 'Successfully creates item',
      type: ItemDTO,
    })
    @Post('create')
    @Bind(Res(), Body(new ValidationPipe))
    async addItem(res: Response, body: ItemDTO) {
      const item = await this.itemService.createItem(body);
      res.status(HttpStatus.CREATED).send(item);
    }

    /**
     * Query for items with the following query fields
     */
     @ApiOkResponse({
      description: 'Successfully retrieves queried items',
      type: [ItemDTO],
    })
    @Get()
    @Bind(Res(), Query())
    async findAll(res, query: QueryItemDTO) {
      const items = await this.itemService.queryItems(query);
      res.status(HttpStatus.OK).send(items);
    }

    /**
     * Query for an item by id 
     */
    @Get(':id')
    @ApiOkResponse({
      description: 'Successfully retrieves item',
      type: ItemDTO,
    })
    @Bind(Res(), Param(new ValidationPipe))
    async findOne(res, params: ItemIdDTO) {
      const item = await this.itemService.findOne(params.id);
      res.status(HttpStatus.OK).send(item);
    }

    /**
     * Update the fields of an item with the given id
     */
    @Patch(':id')
    @ApiOkResponse({
      description: 'Successfully updates item',
      type: ItemDTO,
    })
    @Bind(Res(), Param(new ValidationPipe), Body(new ValidationPipe))
    async updateItem(res, params: ItemIdDTO, body: UpdateItemDTO) {
      const item = await this.itemService.updateItem(params.id, body);
      res.status(HttpStatus.OK).send(item);
    }

    /**
     * Perform an action on an item with the given id 
     */
    @Patch(':id/:action')
    @ApiOkResponse({
      description: 'Successfully updates item',
      type: ItemDTO,
    })
    @Bind(Res(), Param(new ValidationPipe), Body(new ValidationPipe))
    async action(res, params: ItemActionDTO, body: ItemQuantityDTO) {
      const item = await this.itemService.action(params.id, params.action, body.quantity);
      res.status(HttpStatus.OK).send(item);
    }

   /**
    * Delete an item with the given id
    */
    @Delete(':id')
    @ApiNoContentResponse({
      description: 'Successfully deletes item',
    })
    @Bind(Res(),Param(new ValidationPipe))
    async delete(res, params: ItemIdDTO){
        const item = await this.itemService.deleteItem(params.id);
        res.status(HttpStatus.NO_CONTENT).send(item);
    }

}
