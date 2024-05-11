import { BadRequestException } from '@nestjs/common';
import { Food } from 'src/contexts/food/domain/food.entity';
import { FoodRepository } from 'src/contexts/food/domain/repository';
import { FoodExistFindBy } from 'src/contexts/food/domain/services/food-exist-find-by';
import { FoodId } from 'src/contexts/food/domain/value-object/food-id';
import { FoodName } from 'src/contexts/food/domain/value-object/food-name';
import { CreateFoodDto } from 'src/contexts/food/infrastructura/http/dto/create-food.dto';

export class FoodCreate {
  private readonly _findBy: FoodExistFindBy;
  constructor(
    private readonly FoodImplementation: FoodRepository,
    private readonly uuidv4,
  ) {
    this._findBy = new FoodExistFindBy(FoodImplementation);
  }

  async run(createFoodDto: CreateFoodDto) {
    const food: Food[] = await this._findBy.run(createFoodDto.name);

    if (food.length > 0) throw new BadRequestException('Food already exists');

    const foodCreate = new Food({
      id: new FoodId(await this.uuidv4()),
      name: new FoodName(createFoodDto.name),
    });

    const foodCreateDb = await this.FoodImplementation.create(foodCreate);
    return foodCreateDb.toPrimitives();
  }
}
