import { FindOptionsWhere } from 'typeorm';
import { Food } from '../../domain/food.entity';
import { FoodRepository } from '../../domain/repository';
import { FoodId } from '../../domain/value-object/food-id';
import { FoodEntity } from '../sql/food.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FoodImplementation implements FoodRepository {
  async findAll(): Promise<Food[]> {
    const foods = await FoodEntity.find();
    return foods.map((food) => Food.fromPrimitives(food));
  }

  async findById(id: FoodId): Promise<Food | null> {
    const food = await FoodEntity.findOneBy({ _id: id.value });

    if (!food) return null;

    return Food.fromPrimitives(food);
  }

  async create(food: Food): Promise<Food> {
    const prepareFood = new FoodEntity();
    prepareFood._id = food.id.value;
    prepareFood.name = food.name.value;

    await prepareFood.save();

    return food;
  }

  async update(id: FoodId, food: Food): Promise<Food> {
    const prepareFood = new FoodEntity();
    prepareFood.name = food.name.value;

    await FoodEntity.update({ _id: id.value }, prepareFood);
    return Food.fromPrimitives(await FoodEntity.findOneBy({ _id: id.value }));
  }

  async delete(id: FoodId): Promise<void> {
    FoodEntity.delete({ _id: id.value });
  }

  async findBy(
    where: FindOptionsWhere<FoodEntity> | FindOptionsWhere<FoodEntity>[],
  ): Promise<Food[]> {
    const foods = await FoodEntity.find({
      where: { ...where },
    });

    return foods.map((food) => Food.fromPrimitives(food));
  }
}
