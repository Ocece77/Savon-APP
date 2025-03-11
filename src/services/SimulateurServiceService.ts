import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Recette } from "../models/Recette";

export class SimulateurServiceService {
    apiURL="http://localhost:8080/api-savon/v1"
      constructor(private http:HttpClient) { }
      getAllRecette(): Observable<Recette[]> {
        return this.http.get<Recette[]>(`${this.apiURL}/recette`);
      }}
    