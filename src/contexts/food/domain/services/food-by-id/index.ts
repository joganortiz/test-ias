import { NotFoundException } from '@nestjs/common';
import { FoodRepository } from '../../repository';
import { FoodId } from '../../value-object/food-id';
import { Food } from '../../food.entity';

export class FoodByIdServices {
  private readonly foodImplementation: FoodRepository;
  constructor(_foodRepository: FoodRepository) {
    this.foodImplementation = _foodRepository;
  }

  async run(id: string): Promise<Food> {
    const _id = new FoodId(id);

    const food = await this.foodImplementation.findById(_id);

    if (!food) throw new NotFoundException('Food not found');

    return food;
  }
}
