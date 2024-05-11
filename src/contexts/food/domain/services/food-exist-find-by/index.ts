import { Food } from '../../food.entity';
import { FoodRepository } from '../../repository';

export class FoodExistFindBy {
  constructor(private readonly foodRepository: FoodRepository) {}
  async run(name: string): Promise<Food[]> {
    const food = await this.foodRepository.findBy({ name: name });
    return food;
  }
}
