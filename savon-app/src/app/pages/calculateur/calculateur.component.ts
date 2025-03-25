import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../../models/Ingredient';
import { IngredientService } from '../../../services/ingredient.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-calculateur',
  templateUrl: './calculateur.component.html',
  styleUrl: './calculateur.component.css'
})
export class CalculateurComponent implements OnInit{
  ingredients: Ingredient[] = []; // Liste des ingrédients de l’API
  isLoading: boolean = true; // Flag marquant la récupération des données
  errorMessage: string = ""; // Eventuel message d'erreur
  isNotCompleted : boolean = false;
  isCreated : boolean =  false;
  isUpdated : boolean = false;
  nomIngredient : string =  "";
  isDeleted : boolean = false;
  seletedIngredient: any = {}

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.fetchIngredients();
  }

  setCurrentIngredient(id : number):void{
    if (!id){
      return
    }
    this.seletedIngredient = this.ingredients.filter((ingredient) => ingredient.id == id)[0]
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
    
    for(const [key,val] of Object.entries(form.value)){
      if (!val && key != "estcorpsgras"){  // Si tout les champs ne sont pas remplie, l'object n'est pas envoyer
        this.isNotCompleted = true;
        return
      } 
    } 

    this.ingredientService.postIngredient(form.value).subscribe({next:(res)=>{
          console.log(res)
          this.isNotCompleted = false;
          this.isCreated = true
          this.nomIngredient = form.value["nom"]
          this.fetchIngredients()
          setTimeout(()=>{
            this.isCreated = false;
            form.reset()
          }, 5000)
          
        }})
    if (form.valid){
        console.log(form.value)
       }
   
  
  }

  updateIngredient(form : NgForm):void{
    if (form.value == this.seletedIngredient){
      return
    } else {
      this.ingredientService.putIngredient(this.seletedIngredient.id , form.value).subscribe({next:(res)=>{
        console.log(res);
        this.isUpdated = true;
        setTimeout(()=>{
          this.isUpdated = false;
        }, 5000)
        this.fetchIngredients()
      }})
    }
    
  }

  deleteIngredient(id : number):void{
    this.ingredientService.deleteIngredient(id).subscribe({next:(res)=>{
      console.log(res);
      this.fetchIngredients()
    }})
  }

  deleteAllIngredient():void{
    this.ingredientService.deleteAllIngredient().subscribe({next:(res) =>{
      console.log(res);
      this.fetchIngredients()
      setTimeout(()=>{
        this.isDeleted = false;
      }, 5000)
    }})
  }
}
