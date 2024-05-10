import { Food } from "../../domain/food.entity";
import { FoodRepository } from "../../domain/repository";
import { FoodEntity } from "../sql/food.entity";

export class FoodImplementation implements FoodRepository{

    async findAll(): Promise<Food[]> {
        const foods = await FoodEntity.find();
        // return users.map((user) => User.fromPrimitives(user));
        return foods.map((food) => Food.fromPrimitives(food));
    }

    async create(food: Food): Promise<Food> {
        const prepareFood = new FoodEntity();
        prepareFood._id = food.id.value;
        prepareFood.name = food.name.value;

        await prepareFood.save();

        return food;
    }
}