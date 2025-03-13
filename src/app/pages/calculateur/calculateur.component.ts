import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../../models/Ingredient';
import { IngredientService } from '../../../services/ingredient.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calculateur',
  templateUrl: './calculateur.component.html',
  styleUrl: './calculateur.component.css'
})
export class CalculateurComponent implements OnInit{
  ingredients: Ingredient[] = []; // Liste des ingrédients de l’API
  isLoading: boolean = true; // Flag marquant la récupération des données
  errorMessage: string = ""; // Eventuel message d'erreur
  
  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.fetchIngredients();
  }

  fetchIngredients(): void {
    this.ingredientService.getAllIngredients().subscribe({
    next: (data) => {
    this.ingredients = data;
    this.isLoading = false;
    },
        error: (error) => {
        this.errorMessage = "Erreur lors du chargement des ingrédients.";
        console.error("Erreur API:", error);
        this.isLoading = false;
    }
    });
   }

  createIngredient(form : NgForm) : void{
    this.ingredientService.postIngredient(form.value).subscribe({next:(res)=>{
      console.log(res)
    }})
   if (form.valid){
    console.log(form.value)
   }
  }
}
