import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;
    @ViewChild('f') shoppingListForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

  ngOnInit(): void {
      this.subscription = this.shoppingListService.startEditing
      .subscribe(
          (index: number) => {
              this.editMode = true;
              this.editedItemIndex = index;
              this.editedItem = this.shoppingListService.getIngredient(index);
              this.shoppingListForm.setValue(
                  {
                      name: this.editedItem.name,
                      amount: this.editedItem.amount
                  }
              );
          }
      );
  }

  onSubmit(form: NgForm): void{
     const value = form.value;
     const newIngredient = new Ingredient(value.name, value.amount);

     if (this.editMode){
         this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
     } else {
        this.shoppingListService.addIngredient(newIngredient);
     }

     this.editMode = false;
     form.reset();
  }

  onClear(): void{
      this.shoppingListForm.reset();
      this.editMode = false;
  }

  onDelete(): void{
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear();
  }
}
