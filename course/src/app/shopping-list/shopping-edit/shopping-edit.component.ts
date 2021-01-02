import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false })
  nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput', { static: false })
  amountInputRef: ElementRef<HTMLInputElement>;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem = () => {
    const ingredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      parseInt(this.amountInputRef.nativeElement.value)
    );

    this.shoppingListService.addIngredient(ingredient);
  };
}
