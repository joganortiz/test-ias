import { IsNotEmpty } from "class-validator";

export class CreateFoodDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
}
