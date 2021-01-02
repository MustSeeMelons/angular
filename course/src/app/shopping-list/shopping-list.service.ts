import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredinetsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Stones', 5),
    new Ingredient('Bricks', 10),
  ];

  getIngredients = () => {
    return this.ingredients.slice();
  };

  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    this.ingredinetsChanged.emit(this.ingredients.slice());
  };

  addIngredients = (ingredients: Ingredient[]) => {
    this.ingredients.push(...ingredients);
    this.ingredinetsChanged.emit(this.ingredients.slice());
  };
}
