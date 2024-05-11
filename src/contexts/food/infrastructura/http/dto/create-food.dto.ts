import { IsNotEmpty, Length } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 55, { message: 'Name must be between 3 and 55 characters' })
  name: string;
}
