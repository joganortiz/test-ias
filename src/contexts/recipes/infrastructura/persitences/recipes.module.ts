import { Module } from '@nestjs/common';
import { RecipesService } from '../../recipes.service';
import { RecipesController } from '../http/controllers/recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesEntity } from '../sql/recipes.entity';
import { FoodEntity } from 'src/contexts/food/infrastructura/sql/food.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipesEntity, FoodEntity])
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
