import { FoodEntity } from "../../../food/infrastructura/sql/food.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum dificualtadType {
    FACIL = "facil",
    MEDIO = "medio",
    DIFICIL = "dificil"
}

@Entity('recipes')
export class RecipesEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    _id: String;

    @Column({
        type: "varchar",
        length: "55",
    })
    name: string;

    @Column({
        type: "longtext"
    })
    description: string;

    @Column({
        type: "enum",
        enum: dificualtadType,
        default: dificualtadType.MEDIO
    })
    dificualtad : dificualtadType;

    
    @ManyToOne(() => FoodEntity, (food) => food.recipes, {
        cascade: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({
        name: "food_id",
        foreignKeyConstraintName: "fk_recipes_food"
    })
    food: FoodEntity
}