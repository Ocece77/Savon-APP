import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/Ingredient';


@Injectable({
  providedIn: 'root'
})

export class IngredientService {

    private apiURL = 'http://localhost:8080/api-savon/v1';

    constructor(private http: HttpClient) {}

    /**
    * Récupère tous les ingrédients depuis l'API.
    * @returns Un Observable contenant la liste des ingrédients.
    */
    getAllIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(`${this.apiURL}/ingredient`);
  }

    /**
    * Créer un ingrédient dans l'API.
    * @returns Un Observable contenant l'ingrédient créer
    */

     postIngredient(ingredient: object): Observable<Ingredient[]>{
      return this.http.post<Ingredient[]>(`${this.apiURL}/ingredient`, ingredient);
    }


    /**
    * Met à jour d'un ingrédient dans l'API.
    * @returns Un Observable contenant l'ingrédient mise à jour
    */
    putIngredient(id: number, ingredient: Ingredient): Observable<Ingredient[]>{
      return this.http.put<Ingredient[]>(`${this.apiURL}/ingredient/${id}`, ingredient );
    }

    /**
    * Suppression d'un ingrédient dans l'API avec son id
    * @returns Un Observable contenant l'ingrédient mise à jour
    */
    deleteIngredient(id: number): Observable<void>{
      return this.http.delete<void>(`${this.apiURL}/ingredient/${id}`);
    }


}