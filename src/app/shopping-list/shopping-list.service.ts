import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChange = new Subject<Ingredient [] >();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tommato', 10)
  ];
  startEditing = new Subject<number>();

  constructor() { }

  getIngredients(): Ingredient[]
  {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientChange.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientChange.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient): void{
      this.ingredients[index] = newIngredient;
      this.ingredientChange.next(this.ingredients.slice());
  }

  getIngredient(index: number): Ingredient {
      return this.ingredients[index];
  }

  deleteIngredient(index: number): void{
      this.ingredients.slice(index, 1);
      this.ingredientChange.next(this.ingredients.slice());
  }
}
