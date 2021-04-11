import { ICommerce } from 'app/shared/model/commerce.model';

export interface IAutreCommerce {
  id?: number;
  typeCommerce?: string;
  commerce?: ICommerce;
}

export class AutreCommerce implements IAutreCommerce {
  constructor(public id?: number, public typeCommerce?: string, public commerce?: ICommerce) {}
}
