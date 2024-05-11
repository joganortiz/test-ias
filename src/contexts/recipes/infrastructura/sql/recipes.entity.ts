import { FoodEntity } from '../../../food/infrastructura/sql/food.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum difficultyType {
  EASY = 'easy',
  HALF = 'half',
  DIFFICULT = 'difficult',
}

@Entity('recipes')
export class RecipesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({
    type: 'varchar',
    length: '55',
    unique: true,
  })
  name: string;

  @Column({
    type: 'longtext',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: difficultyType,
    default: difficultyType.HALF,
  })
  difficulty: difficultyType;

  @ManyToOne(() => FoodEntity, (food) => food.recipes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'food_id',
    foreignKeyConstraintName: 'fk_recipes_food',
  })
  food: FoodEntity;
}
