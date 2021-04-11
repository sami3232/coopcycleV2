import { IClient } from 'app/shared/model/client.model';
import { ICommercant } from 'app/shared/model/commercant.model';
import { ICoursier } from 'app/shared/model/coursier.model';
import { IPanier } from 'app/shared/model/panier.model';
import { ICommerce } from 'app/shared/model/commerce.model';

export interface IUtilisateur {
  id?: number;
  name?: string;
  firstname?: string;
  mail?: string;
  tel?: string;
  client?: IClient;
  commercant?: ICommercant;
  coursier?: ICoursier;
  paniers?: IPanier[];
  commerce?: ICommerce;
}

export class Utilisateur implements IUtilisateur {
  constructor(
    public id?: number,
    public name?: string,
    public firstname?: string,
    public mail?: string,
    public tel?: string,
    public client?: IClient,
    public commercant?: ICommercant,
    public coursier?: ICoursier,
    public paniers?: IPanier[],
    public commerce?: ICommerce
  ) {}
}
