import { Moment } from 'moment';
import { IPanier } from 'app/shared/model/panier.model';

export interface ICourse {
  id?: number;
  prix?: number;
  distance?: number;
  date?: Moment;
  panier?: IPanier;
}

export class Course implements ICourse {
  constructor(public id?: number, public prix?: number, public distance?: number, public date?: Moment, public panier?: IPanier) {}
}
