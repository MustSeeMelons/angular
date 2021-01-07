import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredinetsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Stones', 5),
    new Ingredient('Bricks', 10),
  ];

  getIngredients = () => {
    return this.ingredients.slice();
  };

  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    this.ingredinetsChanged.next(this.ingredients.slice());
  };

  addIngredients = (ingredients: Ingredient[]) => {
    this.ingredients.push(...ingredients);
    this.ingredinetsChanged.next(this.ingredients.slice());
  };
}
