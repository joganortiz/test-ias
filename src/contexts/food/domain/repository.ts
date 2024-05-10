import { Food } from "./food.entity";

export interface FoodRepository {

    findAll(): Promise<Food[]>;
    create(food: Food): Promise<Food>;
}