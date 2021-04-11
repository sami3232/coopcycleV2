import { ICommerce } from 'app/shared/model/commerce.model';
import { TypeRestaurant } from 'app/shared/model/enumerations/type-restaurant.model';

export interface IRestaurant {
  id?: number;
  resto?: TypeRestaurant;
  commerce?: ICommerce;
}

export class Restaurant implements IRestaurant {
  constructor(public id?: number, public resto?: TypeRestaurant, public commerce?: ICommerce) {}
}
