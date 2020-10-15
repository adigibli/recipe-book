import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    recipeForm: FormGroup;
    id: number;
    editMode = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
      this.route.params
      .subscribe(
          (params: Params) => {
              this.id = +params.id;
              this.editMode = params.id != null;
              this.initForm();
          }
      );
  }

  onCancel(): void {
      this.router.navigate(['../'], {relativeTo: this.route});
  }

  getIngredientControls() {
      return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit(): void{
      if(this.editMode) {
          this.recipeService.editRecipe(this.id, this.recipeForm.value);
      } else {
          this.recipeService.addRecipe(this.recipeForm.value);
      }

      this.onCancel();
  }

  private initForm(): void{
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      const recipeIngredients = new FormArray([]);

      if (this.editMode){
          const recipe = this.recipeService.getRecipe(this.id);
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe.ingredients){
              for (const ingredient of recipe.ingredients){
                  recipeIngredients.push(
                      new FormGroup({
                          name: new FormControl(ingredient.name, Validators.required),
                          amount: new FormControl(ingredient.amount, [
                            , Validators.required,
                            , Validators.pattern(/^[1-9]+[0-9]*$/)
                          ])
                      })
                  );
              }
          }
      }

      this.recipeForm = new FormGroup({
          name: new FormControl(recipeName, Validators.required),
          imagePath: new FormControl(recipeImagePath, Validators.required),
          description: new FormControl(recipeDescription, Validators.required),
          ingredients: recipeIngredients
      });
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).controls.push(
        new FormGroup({
            name: new FormControl(null, Validators.required),
            amount: new FormControl(null, [
                    , Validators.required,
                    , Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
        })
    );
  }
}
