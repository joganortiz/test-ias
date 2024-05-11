import { NotFoundException } from '@nestjs/common';
import { RecipesRepository } from 'src/contexts/recipes/domain/recipes.repository';
import { RecipeId } from 'src/contexts/recipes/domain/value-object/RecipeId';

export class RecipeFindOne {
  private readonly recipesImplementation: RecipesRepository;
  constructor(recipesImplementation: RecipesRepository) {
    this.recipesImplementation = recipesImplementation;
  }

  async run(id: string) {
    const _id = new RecipeId(id);
    const recipe = await this.recipesImplementation.findOne(_id);

    if (!recipe) throw new NotFoundException('Recipe not found');

    return recipe.toPrimitives();
  }
}
