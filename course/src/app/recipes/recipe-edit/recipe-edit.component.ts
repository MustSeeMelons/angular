import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] !== undefined;
      this.initForm();
    });
  }

  private initForm = () => {
    let recipeName = '';
    let imagePath = '';
    let desc = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      desc = recipe.description;

      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredint) => {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredint.name, Validators.required),
              amount: new FormControl(ingredint.amount, {
                validators: [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                ],
              }),
            })
          );
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      desc: new FormControl(desc, Validators.required),
      ingredients: ingredients,
    });
  };

  onSubmit = () => {
    const values = this.recipeForm.value;
    const recipe: Recipe = new Recipe(
      values.name,
      values.desc,
      values.imagePath,
      values.ingredients
    );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }

    this.onCancel();
  };

  onAddIngredient = () => {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, {
          validators: [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ],
        }),
      })
    );
  };

  onCancel = () => {
    this.router.navigate(['../'], { relativeTo: this.route });
  };

  onDeleteIngredient = (index: number) => {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  };
}
