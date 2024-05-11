import { difficultyType } from '../../infrastructura/sql/recipes.entity';

export class RecipeDificultad {
  public readonly value: difficultyType;
  constructor(value: difficultyType) {
    this.value = value;
  }
}
