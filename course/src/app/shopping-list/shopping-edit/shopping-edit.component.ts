import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

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

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}

  onAddItem = () => {
    const ingredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      parseInt(this.amountInputRef.nativeElement.value)
    );

    this.ingredientAdded.emit(ingredient);
  };
}
