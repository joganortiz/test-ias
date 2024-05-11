import { FoodRepository } from 'src/contexts/food/domain/repository';

export class FoodAll {
  constructor(private readonly FoodImplementation: FoodRepository) {}

  async run() {
    const foodAll = await this.FoodImplementation.findAll();
    return foodAll.map((food) => food.toPrimitives());
  }
}
