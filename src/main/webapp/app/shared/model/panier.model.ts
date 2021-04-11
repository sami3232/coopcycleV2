import { ICommerce } from 'app/shared/model/commerce.model';
import { ICourse } from 'app/shared/model/course.model';
import { IProduit } from 'app/shared/model/produit.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IPanier {
  id?: number;
  name?: string;
  prix?: number;
  commerce?: ICommerce[];
  courses?: ICourse[];
  produits?: IProduit[];
  utilisateur?: IUtilisateur;
}

export class Panier implements IPanier {
  constructor(
    public id?: number,
    public name?: string,
    public prix?: number,
    public commerce?: ICommerce[],
    public courses?: ICourse[],
    public produits?: IProduit[],
    public utilisateur?: IUtilisateur
  ) {}
}
