import { FoodRepository } from 'src/contexts/food/domain/repository';
import { FoodByIdServices } from 'src/contexts/food/domain/services/food-by-id';
import { Recipe } from 'src/contexts/recipes/domain/recipe.entity';
import { RecipesRepository } from 'src/contexts/recipes/domain/recipes.repository';
import { RecipeDescriptions } from 'src/contexts/recipes/domain/value-object/RecipeDescriptions';
import { RecipeDificultad } from 'src/contexts/recipes/domain/value-object/RecipeDificualtad';
import { RecipeId } from 'src/contexts/recipes/domain/value-object/RecipeId';
import { RecipeName } from 'src/contexts/recipes/domain/value-object/RecipeName';
import { CreateRecipeDto } from 'src/contexts/recipes/infrastructura/http/dto/create-recipe.dto';

export class RecipeCreate {
  private readonly recipesImplementation: RecipesRepository;
  private readonly foodByIdServices: FoodByIdServices;
  private readonly uuidv4;
  constructor(
    recipesImplementation: RecipesRepository,
    foodImplementation: FoodRepository,
    uuidv4,
  ) {
    this.recipesImplementation = recipesImplementation;
    this.foodByIdServices = new FoodByIdServices(foodImplementation);
    this.uuidv4 = uuidv4;
  }

  async run(createRecipeDto: CreateRecipeDto) {
    const existFood = await this.foodByIdServices.run(createRecipeDto.id_food);

    const recipeCreate = new Recipe({
      id: new RecipeId(await this.uuidv4()),
      name: new RecipeName(createRecipeDto.name),
      description: new RecipeDescriptions(createRecipeDto.description),
      dificualtad: new RecipeDificultad(createRecipeDto.difficulty),
      food: existFood,
    });

    const create = await this.recipesImplementation.create(recipeCreate);
    return create.toPrimitives();
  }
}
