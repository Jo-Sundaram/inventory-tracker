import { Bind, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, ValidationPipe } from '@nestjs/common';
import { ItemDTO } from './dto/item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemsService){}

    @Post('add')
    @Bind(Res(), Body(new ValidationPipe))
    async addItem(res, body: ItemDTO) {
      const item = await this.itemService.create(body);
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
    async udpate(res, params, body: ItemDTO) {
      const item = await this.itemService.update(params.id, body);
      res.status(HttpStatus.OK).send(item);
    }

    @Delete(':id')
    @Bind(Res(), Param())
    async delete(res, params){
        const item = await this.itemService.delete(params.id);
        res.status(HttpStatus.NO_CONTENT).send(item);
    }

}
