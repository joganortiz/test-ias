import { Recipe } from "./recipe.entity"

export interface RecipesRepository {
    findAll(): Promise<Recipe[]>
    create(recipe: Recipe): Promise<Recipe>
}