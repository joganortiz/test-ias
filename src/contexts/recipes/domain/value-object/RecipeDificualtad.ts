import { dificualtadType } from "../../infrastructura/sql/recipes.entity";

export class RecipeDificultad {
    public readonly value: dificualtadType
    constructor(value: dificualtadType) {
        this.value = value;
    }
}