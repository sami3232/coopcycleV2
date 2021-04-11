import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface ICoursier {
  id?: number;
  coordonne?: string;
  noteCoursier?: number;
  utilisateur?: IUtilisateur;
}

export class Coursier implements ICoursier {
  constructor(public id?: number, public coordonne?: string, public noteCoursier?: number, public utilisateur?: IUtilisateur) {}
}
