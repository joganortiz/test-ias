import { RecipesEntity } from "../../../recipes/infrastructura/sql/recipes.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('food')
export class FoodEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column({
        type: "varchar",
        length: 55,
        unique: true
    })
    name: string;

    @OneToMany(type => RecipesEntity, recipes => recipes.food)
    recipes: RecipesEntity[]
} 