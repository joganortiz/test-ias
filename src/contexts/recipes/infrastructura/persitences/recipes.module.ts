import { Module } from '@nestjs/common';
import { RecipesController } from '../http/controllers/recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesEntity } from '../sql/recipes.entity';
import { FoodEntity } from 'src/contexts/food/infrastructura/sql/food.entity';
import { RecipesImplementation } from '../implementation';
import { FoodImplementation } from 'src/contexts/food/infrastructura/implementation';

@Module({
  imports: [TypeOrmModule.forFeature([RecipesEntity, FoodEntity])],
  controllers: [RecipesController],
  providers: [RecipesImplementation, FoodImplementation],
})
export class RecipesModule {}
