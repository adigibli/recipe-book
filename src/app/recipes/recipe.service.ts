import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Recipe } from './Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

//   private recipes: Recipe[] = [
//     new Recipe(
//       "Vinnece Shnitzel", 
//       "This is the sample recipe 1", 
//       "https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg?fit=1200%2C879&ssl=1",
//       [
//         new Ingredient('Meat', 1),
//         new Ingredient('French Fries', 20)
//       ]
//       ),
//     new Recipe(
//       "Big Fat Burger", 
//       "This is the sample recipe 2", 
//       "https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg?fit=1200%2C879&ssl=1",
//       [
//         new Ingredient('Buns', 2),
//         new Ingredient('Meat', 1)
//       ])
//   ];

    private  recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(): Array<Recipe>
  {
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]): void{
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number): Recipe{
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe): void {
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice());
  }

  editRecipe(index: number, newRecipe: Recipe): void {
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]): void{
      this.recipes = recipes;
      this.recipeChanged.next(this.recipes.slice());
  }
}
