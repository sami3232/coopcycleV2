import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IAutreCommerce } from 'app/shared/model/autre-commerce.model';
import { IPanier } from 'app/shared/model/panier.model';
import { IProduit } from 'app/shared/model/produit.model';

export interface ICommerce {
  id?: number;
  adresse?: string;
  name?: string;
  noteCommerce?: number;
  utilisateur?: IUtilisateur;
  restaurant?: IRestaurant;
  autreCommerce?: IAutreCommerce;
  panier?: IPanier;
  produits?: IProduit[];
}

export class Commerce implements ICommerce {
  constructor(
    public id?: number,
    public adresse?: string,
    public name?: string,
    public noteCommerce?: number,
    public utilisateur?: IUtilisateur,
    public restaurant?: IRestaurant,
    public autreCommerce?: IAutreCommerce,
    public panier?: IPanier,
    public produits?: IProduit[]
  ) {}
}
