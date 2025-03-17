import { Component, OnInit } from '@angular/core';
import { Recette } from '../../../models/Recette';
import { RecetteService } from '../../../services/recette.service';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrl: './recettes.component.css'
})
export class RecettesComponent implements OnInit{
  recettes: Recette[] = []; // Liste des ingrédients de l’API
  isLoading: boolean = true; // Flag marquant la récupération des données
  errorMessage: string = ""; // Eventuel message d'erreur
  constructor(private recetteService: RecetteService) {}

  ngOnInit(): void {
    this.fetchIngredients();
  }

  fetchIngredients(): void {
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
}
