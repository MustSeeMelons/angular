import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelectd = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Potato',
      'Simple As Fuck',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/01/baked-potato-500x500.jpg'
    ),
    new Recipe(
      'Potato',
      'Simple As Fuck',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/01/baked-potato-500x500.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected = (recipe: Recipe) => {
    this.recipeWasSelectd.emit(recipe);
  };
}
