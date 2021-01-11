import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') sLform: NgForm;
  subscription: Subscription;
  editMode = false;
  editetItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editetItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);

        this.sLform.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmitItem = (form: NgForm) => {
    const ingredient = new Ingredient(
      form.value.name,
      parseInt(form.value.amount)
    );

    if (!this.editMode) {
      this.shoppingListService.addIngredient(ingredient);
    } else {
      this.shoppingListService.updateIngredient(
        this.editetItemIndex,
        ingredient
      );
    }

    this.onClear();
  };

  onClear = () => {
    this.sLform.reset();
    this.editMode = false;
  };

  onDelete = () => {
    this.shoppingListService.deleteIngredient(this.editetItemIndex);
    this.onClear();
  };
}
