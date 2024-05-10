import { Food } from "src/contexts/food/domain/food.entity"
import { dificualtadType } from "../infrastructura/sql/recipes.entity"
import { RecipeDescriptions } from "./value-object/RecipeDescriptions"
import { RecipeDificultad } from "./value-object/RecipeDificualtad"
import { RecipeId } from "./value-object/RecipeId"
import { RecipeName } from "./value-object/RecipeName"

export class Recipe {

    public readonly id: RecipeId
    public readonly name: RecipeName
    public readonly description: RecipeDescriptions
    public readonly dificualtad: RecipeDificultad
    public readonly food: Food;

    constructor({ id, name, description, dificualtad, food }: { id: RecipeId; name: RecipeName; description: RecipeDescriptions; dificualtad: RecipeDificultad ; food: Food}) {
        this.id = id
        this.name = name
        this.description = description
        this.dificualtad = dificualtad;
        this.food = food
    }

    static create({ id, name, description, dificualtad, food }: { id: string; name: string; description: string; dificualtad: dificualtadType; food: any }) {
        return new Recipe({
            id: new RecipeId(id),
            name: new RecipeName(name),
            description: new RecipeDescriptions(description),
            dificualtad: new RecipeDificultad(dificualtad),
            food: new Food(food)
        })
    }

    toPrimitives(): {

    } {
        return {
            _id: this.id.value,
            name: this.name.value,
            description: this.description.value,
            dificualtad: this.dificualtad.value,
            food: this.food.toPrimitives()
        }
    }
}
