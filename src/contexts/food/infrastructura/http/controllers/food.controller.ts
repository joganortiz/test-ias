import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateFoodDto } from '../dto/create-food.dto';
import { FoodCreate } from 'src/contexts/food/applications/use-cases/food-create';
import { FoodImplementation } from '../../implementation';
import { v4 as uuidv4 } from 'uuid';
import { FoodAll } from 'src/contexts/food/applications/use-cases/food-all';

@Controller('food')
export class FoodController {
  private readonly FoodImplementation: FoodImplementation;
  constructor() {
    this.FoodImplementation = new FoodImplementation();
  }

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return new FoodCreate(this.FoodImplementation, uuidv4).run(createFoodDto);
  }

  @Get()
  findAll() {
    return new FoodAll(this.FoodImplementation).run();
  }
}
