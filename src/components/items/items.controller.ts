import { Bind, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req, Res, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ItemDTO, UpdateItemDTO, ItemQuantityDTO, ItemIdDTO, ActionEnum, ItemActionDTO } from './dto/item.dto';
import { ItemsService } from './items.service';

@Controller('items')
@ApiTags('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService){}

    @Post('create')
    @ApiBody({
      description: 'New item record',
      type: ItemDTO
    })
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
    @Bind(Res(), Query())
    async findAll(res, query) {
      const items = await this.itemService.queryItems(query);
    res.status(HttpStatus.OK).send(items);
    }

    @Get(':id')
    @ApiParam({
      name: 'id',
      description: 'The id of the item',
    })
    @ApiOkResponse({
      description: 'Successfully retrieved item record.',
      type: ItemDTO,
    })
    @Bind(Res(), Param(new ValidationPipe))
    async findOne(res, params: ItemIdDTO) {
      const item = await this.itemService.findOne(params.id);
      res.status(HttpStatus.OK).send(item);
    }

    @Patch(':id')
    @ApiOkResponse({
      description: 'Successfully updated item record.',
      type: ItemDTO,
    })
    @Bind(Res(), Param(new ValidationPipe), Body(new ValidationPipe))
    async updateItem(res, params: ItemIdDTO, body: UpdateItemDTO) {
      const item = await this.itemService.updateItem(params.id, body);
      res.status(HttpStatus.OK).send(item);
    }

    @Patch(':id/:action')
    @ApiParam({
      name: 'id',
      description: 'The id of the item',
    })
    @ApiParam({
      name: 'action',
      description: 'Action to perform on the item',
      enum: ActionEnum,
      enumName: 'Action'
    })
    @ApiOkResponse({
      description: 'Successfully updated item record.',
      type: ItemDTO,
    })
    @Bind(Res(), Param(new ValidationPipe), Body(new ValidationPipe))
    async addToItem(res, params: ItemActionDTO, body: ItemQuantityDTO) {
      const item = await this.itemService.action(params.id, params.action, body.quantity);
      res.status(HttpStatus.OK).send(item);
    }


    @Delete(':id')
    @ApiParam({
      name: 'id',
      description: 'The id of the item',
    })
    @ApiNoContentResponse({
      description: 'Successfully deleted item record.',
    })
    @Bind(Res(),Param(new ValidationPipe))
    async delete(res, params: ItemIdDTO){
        const item = await this.itemService.deleteItem(params.id);
        res.status(HttpStatus.NO_CONTENT).send(item);
    }

}
