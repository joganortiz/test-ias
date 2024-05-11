import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecipesModule } from './contexts/recipes/infrastructura/persitences/recipes.module';
import { FoodModule } from './contexts/food/infrastructura/persistence/food.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './config/config-typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOption),
    FoodModule,
    RecipesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
