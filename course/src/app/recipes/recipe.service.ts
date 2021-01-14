import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    // new Recipe(
    //   'Potato',
    //   'Simple As Fuck',
    //   'https://cdn.loveandlemons.com/wp-content/uploads/2020/01/baked-potato-500x500.jpg',
    //   [new Ingredient('Apple', 1), new Ingredient('Jesus', 1)]
    // ),
    // new Recipe(
    //   'Wet Potato',
    //   'Simple As Fuck',
    //   'https://cdn.loveandlemons.com/wp-content/uploads/2020/01/baked-potato-500x500.jpg',
    //   [
    //     new Ingredient('Apple', 1),
    //     new Ingredient('Jesus', 1),
    //     new Ingredient('Water', 1),
    //   ]
    // ),
  ];

  setRecupes = (recipes: Recipe[]) => {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  };

  getRecipes = () => {
    return this.recipes.slice();
  };

  addIngredientsToShoppingList = (ingredients: Ingredient[]) => {
    this.shoppingListService.addIngredients(ingredients);
  };

  getRecipe = (id: number) => {
    return this.recipes[id];
  };

  addRecipe = (recipe: Recipe) => {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  };

  updateRecipe = (index: number, recipe: Recipe) => {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  };

  deleteRecipe = (index: number) => {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  };
}
