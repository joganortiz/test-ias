import { FoodRepository } from 'src/contexts/food/domain/repository';
import { FoodByIdServices } from 'src/contexts/food/domain/services/food-by-id';

export class FoodRemove {
  private readonly foodImplementation: FoodRepository;
  private readonly foodByIdServices: FoodByIdServices;

  constructor(_foodRepository: FoodRepository) {
    this.foodImplementation = _foodRepository;
    this.foodByIdServices = new FoodByIdServices(_foodRepository);
  }

  async run(id: string) {
    const food = await this.foodByIdServices.run(id);

    await this.foodImplementation.delete(food.id);

    return await food.toPrimitives();
  }
}
