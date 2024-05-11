import { BadRequestException } from '@nestjs/common';
import { RecipesRepository } from 'src/contexts/recipes/domain/recipes.repository';
import { FiltersRecipeDto } from 'src/contexts/recipes/infrastructura/http/dto/filters-recipe.dto';

export class RecipesAll {
  private readonly recipesImplementation: RecipesRepository;
  constructor(recipesImplementation: RecipesRepository) {
    this.recipesImplementation = recipesImplementation;
  }

  async run(filtersRecipeDto: FiltersRecipeDto) {
    const { data, meta } =
      await this.recipesImplementation.findAll(filtersRecipeDto);

    if (meta.lastPage < meta.page)
      throw new BadRequestException('Page not found');

    return {
      data: data.map((recipe) => recipe.toPrimitives()),
      meta,
    };
  }
}
