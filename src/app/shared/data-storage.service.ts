import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from './../recipes/Recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
    private recipeUrl = 'https://ng-course-recipe-book-5dbf4.firebaseio.com/recipes.json';

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) { }

  storeRecipe(): void
  {
    const recipes = this.recipeService.getRecipes();

    this.httpClient.put(this.recipeUrl, recipes).subscribe(
        response => {
            console.log(response);
        }
    )
  }

  fetchRecipe(){
      return this.httpClient.get<Recipe[]>(this.recipeUrl)
      .pipe(
          map( recipes => {
          return recipes.map( recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
          }),
          tap(recipes => {
            this.recipeService.setRecipes(recipes);
          })
      );
  }
}
