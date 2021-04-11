import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IClient {
  id?: number;
  adresse?: string;
  name?: string;
  utilisateur?: IUtilisateur;
}

export class Client implements IClient {
  constructor(public id?: number, public adresse?: string, public name?: string, public utilisateur?: IUtilisateur) {}
}
