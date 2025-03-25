import { LigneIngredient } from "./LigneIngredient";

export class RecetteDTO {
    /**
     * Identifiant unique de la recette (clé primaire).
     */
    id: number | null = null;

    /**
     * Nom de la recette défini par l'utilisateur.
     */
    titre: string = "";
    
    /**
     * Description textuelle de la recette.
     */
    description: string = "";
    
    /**
     * Valeur du surgraissage de la recette (%).
     * 
     * Le surgraissage correspond à l'excédent d'huile non saponifiée dans le savon,
     * permettant d'apporter des propriétés nourrissantes et adoucissantes.
     */
    surgraissage: number = 0;
    
   
    
    /**
     * Indique si la recette utilise de la soude (`true`) ou de la potasse (`false`).
     */
    avecSoude: boolean = true;
    
    /**
     * Concentration de l'agent alcalin utilisé (%).
     */
    concentrationAlcalin: number = 0;
    
  
    
    /**
     * Liste des ingrédients utilisés dans la recette.
     */
    ligneIngredients: LigneIngredient[] = [];
    
    
}
