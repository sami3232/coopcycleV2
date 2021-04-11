import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface ICommercant {
  id?: number;
  adresse?: string;
  utilisateur?: IUtilisateur;
}

export class Commercant implements ICommercant {
  constructor(public id?: number, public adresse?: string, public utilisateur?: IUtilisateur) {}
}
