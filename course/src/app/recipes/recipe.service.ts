import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'Potato',
      'Simple As Fuck',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/01/baked-potato-500x500.jpg',
      [new Ingredient('Apple', 1), new Ingredient('Jesus', 1)]
    ),
    new Recipe(
      'Wet Potato',
      'Simple As Fuck',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/01/baked-potato-500x500.jpg',
      [
        new Ingredient('Apple', 1),
        new Ingredient('Jesus', 1),
        new Ingredient('Water', 1),
      ]
    ),
  ];

  getRecipes = () => {
    return this.recipes.slice();
  };

  addIngredientsToShoppingList = (ingredients: Ingredient[]) => {
    this.shoppingListService.addIngredients(ingredients);
  };

  getRecipe = (id: number) => {
    return this.recipes[id];
  };
}
