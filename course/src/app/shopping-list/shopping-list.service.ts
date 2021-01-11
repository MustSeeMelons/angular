import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredinetsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

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

  getIngredient = (index: number) => {
    return this.ingredients[index];
  };

  updateIngredient = (index: number, ingredient: Ingredient) => {
    this.ingredients[index] = ingredient;
    this.ingredinetsChanged.next(this.ingredients.slice());
  };

  deleteIngredient = (index: number) => {
    this.ingredients.splice(index, 1);
    this.ingredinetsChanged.next(this.ingredients.slice());
  };
}
