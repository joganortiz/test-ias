import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RecipesImplementation } from '../../implementation';
import { RecipesAll } from 'src/contexts/recipes/application/case-uses/recipe-find-all';
import { RecipeCreate } from 'src/contexts/recipes/application/case-uses/recipe-create';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { FoodImplementation } from 'src/contexts/food/infrastructura/implementation';
import { v4 as uuidv4 } from 'uuid';
import { RecipeFindOne } from 'src/contexts/recipes/application/case-uses/recipe-find-one';
import { FiltersRecipeDto } from '../dto/filters-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipesImplementation: RecipesImplementation,
    private readonly foodImplementation: FoodImplementation,
  ) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return new RecipeCreate(
      this.recipesImplementation,
      this.foodImplementation,
      uuidv4,
    ).run(createRecipeDto);
  }

  @Get()
  findAll(@Query() filtersRecipeDto: FiltersRecipeDto) {
    return new RecipesAll(this.recipesImplementation).run(filtersRecipeDto);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new NotFoundException('Recipe not found'),
      }),
    )
    id: string,
  ) {
    return new RecipeFindOne(this.recipesImplementation).run(id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  } */
}
