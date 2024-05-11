import { IsEnum, IsNotEmpty, IsUUID, Length } from 'class-validator';
import { difficultyType } from '../../sql/recipes.entity';

export class CreateRecipeDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 55, { message: 'Name must be between 3 and 55 characters' })
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsNotEmpty({ message: 'Difficulty is required' })
  @IsEnum(['easy', 'half', 'difficult'], {
    message: 'Difficulty must be easy, half or difficult',
  })
  difficulty: difficultyType;

  @IsNotEmpty({ message: 'Id food is required' })
  @IsUUID(4, { message: 'Id food must be a valid UUID' })
  id_food: string;
}
