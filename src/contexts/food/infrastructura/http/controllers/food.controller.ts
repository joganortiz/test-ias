import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { CreateFoodDto } from '../dto/create-food.dto';
import { FoodCreate } from 'src/contexts/food/applications/use-cases/food-create';
import { v4 as uuidv4 } from 'uuid';
import { FoodAll } from 'src/contexts/food/applications/use-cases/food-find-all';
import { FoodUpdate } from 'src/contexts/food/applications/use-cases/food-update';
import { FoodById } from 'src/contexts/food/applications/use-cases/food-find-one';
import { FoodRemove } from 'src/contexts/food/applications/use-cases/food-remove';
import { FoodImplementation } from '../../implementation';

@Controller('food')
export class FoodController {
  constructor(private readonly foodImplementation: FoodImplementation) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return new FoodCreate(this.foodImplementation, uuidv4).run(createFoodDto);
  }

  @Get()
  findAll() {
    return new FoodAll(this.foodImplementation).run();
  }

  @Get(':id')
  findById(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new NotFoundException('Food not found'),
      }),
    )
    id: string,
  ) {
    return new FoodById(this.foodImplementation).run(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new NotFoundException('Food not found'),
      }),
    )
    id: string,
    @Body() updateFoodDto: CreateFoodDto,
  ) {
    return new FoodUpdate(this.foodImplementation).run(id, updateFoodDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new NotFoundException('Food not found'),
      }),
    )
    id: string,
  ) {
    return new FoodRemove(this.foodImplementation).run(id);
  }
}
