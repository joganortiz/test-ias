import { Food } from 'src/contexts/food/domain/food.entity';
import { FoodRepository } from 'src/contexts/food/domain/repository';
import { FoodByIdServices } from 'src/contexts/food/domain/services/food-by-id';
import { FoodName } from 'src/contexts/food/domain/value-object/food-name';
import { UpdateFoodDto } from 'src/contexts/food/infrastructura/http/dto/update-food.dto';

export class FoodUpdate {
  private readonly foodImplementation: FoodRepository;
  private readonly foodByIdServices: FoodByIdServices;
  constructor(_foodRepository: FoodRepository) {
    this.foodImplementation = _foodRepository;
    this.foodByIdServices = new FoodByIdServices(_foodRepository);
  }

  async run(id: string, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodByIdServices.run(id);

    const foodUpdateData = Food.create({
      id: food.id,
      name: new FoodName(updateFoodDto.name ?? food.name.value),
    });

    const foodUpdate = await this.foodImplementation.update(
      food.id,
      foodUpdateData,
    );

    return await foodUpdate.toPrimitives();
  }
}
