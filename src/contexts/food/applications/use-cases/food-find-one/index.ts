import { NotFoundException } from '@nestjs/common';
import { FoodRepository } from 'src/contexts/food/domain/repository';
import { FoodId } from 'src/contexts/food/domain/value-object/food-id';

export class FoodById {
  constructor(private readonly FoodImplementation: FoodRepository) {}

  async run(id: string) {
    const _id = new FoodId(id);
    const food = await this.FoodImplementation.findById(_id);

    if (!food) throw new NotFoundException('Food not found');

    return food.toPrimitives();
  }
}
