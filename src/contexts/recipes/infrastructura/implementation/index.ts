import { Injectable } from '@nestjs/common';
import { Recipe } from '../../domain/recipe.entity';
import { RecipesRepository } from '../../domain/recipes.repository';
import { RecipesEntity } from '../sql/recipes.entity';
import { FoodEntity } from 'src/contexts/food/infrastructura/sql/food.entity';
import { RecipeId } from '../../domain/value-object/RecipeId';
import { FiltersRecipeDto } from '../http/dto/filters-recipe.dto';

@Injectable()
export class RecipesImplementation implements RecipesRepository {
  async findAll(filtersRecipeDto: FiltersRecipeDto): Promise<{
    data: Recipe[];
    meta: { total: number; page: number; lastPage: number };
  }> {
    const { page = 1, limit = 10 } = filtersRecipeDto;

    const totalRecipes = await RecipesEntity.count();

    const recipes = await RecipesEntity.find({
      relations: { food: true },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: recipes.map((recipe) => Recipe.fromPrimitives(recipe)),
      meta: {
        total: totalRecipes,
        page,
        lastPage: Math.ceil(totalRecipes / limit),
      },
    };
  }

  async create(recipe: Recipe): Promise<Recipe> {
    const prepareRecipe = new RecipesEntity();
    prepareRecipe._id = recipe.id.value;
    prepareRecipe.name = recipe.name.value;
    prepareRecipe.description = recipe.description.value;
    prepareRecipe.difficulty = recipe.dificualtad.value;

    const prepareFood = new FoodEntity();
    prepareFood._id = recipe.food.id.value;

    prepareRecipe.food = prepareFood;
    await prepareRecipe.save();
    return recipe;
  }

  async findOne(id: RecipeId): Promise<Recipe | null> {
    const recipe = await RecipesEntity.findOne({
      where: { _id: id.value },
      relations: { food: true },
    });

    if (!recipe) return null;

    return Recipe.fromPrimitives(recipe);
  }
}
