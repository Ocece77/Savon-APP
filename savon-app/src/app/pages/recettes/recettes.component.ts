import { Component, OnInit } from '@angular/core';
import { Recette } from '../../../models/Recette';
import { RecetteService } from '../../../services/recette.service';
import { Ingredient } from '../../../models/Ingredient';
import { IngredientService } from '../../../services/ingredient.service';
import { NgForm } from '@angular/forms';
import { RecetteDTO } from '../../../models/RecetteDTO';
import { LigneIngredient } from '../../../models/LigneIngredient';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrl: './recettes.component.css'
})
export class RecettesComponent implements OnInit{
  recettes: Recette[] = []; // Liste des ingrédients de l’API
  ingredients: Ingredient[] = []; // Liste des ingrédients de l’API
  isLoading: boolean = true; // Flag marquant la récupération des données
  errorMessage: string = ""; // Eventuel message d'erreur
  idIngredientSelect:number | null=null
  recetteDTO = new RecetteDTO()
  isNotCompleted : boolean = false;
  isCreated : boolean =  false;
  isUpdated : boolean = false;
  nomRecette : string =  "";
  currIngredient : Ingredient|null = null;
  selectedRecette : any = {}
  isDeleted : boolean = false
  currPourcentage: number = 100

  constructor(private recetteService: RecetteService ,private ingredientService: IngredientService) {}

    ngOnInit(): void {
      this.fetchIngredients();
      this.fetchRecettes();
    }

    calculPourcentage(ligne: LigneIngredient[]){
      return this.currPourcentage / ligne.length
    }

    setCurrentRecette(id : number):void{
      if (!id){
        return
      }
      this.selectedRecette = this.recettes.filter((rec) => rec.id == id)[0]
      console.log( this.selectedRecette)
    }

    removeIngredient(id: number | null | undefined):void{
      this.recetteDTO.ligneIngredients = this.recetteDTO.ligneIngredients.filter((rec) => rec.ingredient?.id != id)
      console.log(this.recetteDTO.ligneIngredients)
      console.log(id)
    }


    fetchIngredients():void{
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

    fetchRecettes(): void {
      this.recetteService.getAllRecettes().subscribe({
      next: (data) => {
      this.recettes = data;
      this.isLoading = false;
      },
          error: (error) => {
          this.errorMessage = "Erreur lors du chargement des ingrédients.";
          console.error("Erreur API:", error);
          this.isLoading = false;
      }
      });
    }

    ajoutLigne(form : NgForm) : void {
      const value = form.value["ingredient_selection"];
      this.currIngredient = this.ingredients.filter((item) => item.id == value)[0]  
      let ligne = new LigneIngredient();
      ligne.ingredient = this.currIngredient
      this.recetteDTO.ligneIngredients.push(ligne);
    }

    createRecette(form : NgForm):void{
      this.recetteDTO.titre = form.value["titre"]
      this.recetteDTO.description = form.value["description"]
      this.recetteDTO.surgraissage = form.value["surgraissage"]
      this.recetteDTO.avecSoude = form.value["avecSoude"]
      this.recetteDTO.concentrationAlcalin = form.value["concentrationAlcalin"]
      
      this.recetteService.addRecette(this.recetteDTO).subscribe({
      next: (data) => {
          console.log(data)
      }});
      this.isNotCompleted = false;
      this.isCreated = true
      this.nomRecette = form.value["titre"]
      this.currPourcentage = 100
      this.fetchRecettes()
      form.reset()
      setTimeout(()=>{
        this.isCreated = false;
      }, 5000)
    }

    updateRecette(form : NgForm):void{
      if (form.value == this.selectedRecette){
        return
      } else {
        for (const [key, val] of Object.entries(form.value)){
          if( form.value[key] != this.selectedRecette[key]){
            if (!form.value[key] ){
              continue; 
            }
            console.log(this.selectedRecette[key] , "a changé pour :")
            this.selectedRecette[key] = val
            console.log(this.selectedRecette[key] )
          }
        }
        this.recetteService.updateRecette(this.selectedRecette.id , this.selectedRecette).subscribe({next:(res)=>{
          console.log(res);
          this.isUpdated = true;
          setTimeout(()=>{
            this.isUpdated = false;
          }, 5000)
          this.fetchRecettes()
        }})
      }
      
    }
  
    deleteRecette(id : number):void{
      alert(id)
      this.recetteService.deleteRecette(id).subscribe({next:(res)=>{
        console.log(res , id);
        this.fetchRecettes()
      }})
    }
  
    deleteAllRecette():void{
      this.recetteService.deleteAllRecette().subscribe({next:(res) =>{
        console.log(res);
        this.fetchRecettes()
        setTimeout(()=>{
          this.isDeleted = false;
        }, 5000)
      }})
    }


    sortIngredient(ingredients : LigneIngredient[]):LigneIngredient[] {
       let listeIngredients = ingredients.sort((a, b) => a.quantite - b.quantite);
       return listeIngredients;
    }
}
