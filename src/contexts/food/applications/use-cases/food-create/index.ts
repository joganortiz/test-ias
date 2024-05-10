import { Food } from "src/contexts/food/domain/food.entity";
import { FoodRepository } from "src/contexts/food/domain/repository";
import { FoodId } from "src/contexts/food/domain/value-object/food-id";
import { FoodName } from "src/contexts/food/domain/value-object/food-name";
import { CreateFoodDto } from "src/contexts/food/infrastructura/http/dto/create-food.dto";


export class FoodCreate {
    constructor(
        private readonly FoodImplementation: FoodRepository,
        private readonly uuidv4
    ) {}

    async run (createFoodDto: CreateFoodDto) {
        const foodCreate = new Food({
            id: new FoodId(await this.uuidv4()),
            name: new FoodName(createFoodDto.name)
        });

        const foodCreateDb =  await this.FoodImplementation.create(foodCreate);
        return foodCreateDb.toPrimitives()
    }
}