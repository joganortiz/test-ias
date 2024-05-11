import { FindOptionsWhere } from 'typeorm';
import { Food } from './food.entity';
import { FoodId } from './value-object/food-id';
import { FoodEntity } from '../infrastructura/sql/food.entity';

export interface FoodRepository {
  create(food: Food): Promise<Food>;
  findAll(): Promise<Food[]>;
  findById(id: FoodId): Promise<Food | null>;
  update(id: FoodId, food: Food): Promise<Food>;
  delete(id: FoodId): Promise<void>;
  findBy: (
    where: FindOptionsWhere<FoodEntity> | FindOptionsWhere<FoodEntity>[],
  ) => Promise<Food[]>;
}
