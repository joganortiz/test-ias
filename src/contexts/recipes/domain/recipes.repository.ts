import { FiltersRecipeDto } from '../infrastructura/http/dto/filters-recipe.dto';
import { Recipe } from './recipe.entity';
import { RecipeId } from './value-object/RecipeId';

export interface RecipesRepository {
  findAll(filtersRecipeDto: FiltersRecipeDto): Promise<{
    data: Recipe[];
    meta: { total: number; page: number; lastPage: number };
  }>;
  create(recipe: Recipe): Promise<Recipe>;
  findOne(id: RecipeId): Promise<Recipe | null>;
}
