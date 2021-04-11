import { ICommerce } from 'app/shared/model/commerce.model';
import { IPanier } from 'app/shared/model/panier.model';

export interface IProduit {
  id?: number;
  name?: string;
  prix?: number;
  description?: string;
  commerce?: ICommerce[];
  paniers?: IPanier[];
}

export class Produit implements IProduit {
  constructor(
    public id?: number,
    public name?: string,
    public prix?: number,
    public description?: string,
    public commerce?: ICommerce[],
    public paniers?: IPanier[]
  ) {}
}
