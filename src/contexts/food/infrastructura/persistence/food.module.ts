import { Module } from '@nestjs/common';
import { FoodController } from '../http/controllers/food.controller';
import { FoodImplementation } from '../implementation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from '../sql/food.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoodEntity]),
    FoodImplementation
  ],
  controllers: [FoodController],
  providers: [FoodImplementation],
})
export class FoodModule {}
