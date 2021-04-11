import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAutreCommerce } from 'app/shared/model/autre-commerce.model';

type EntityResponseType = HttpResponse<IAutreCommerce>;
type EntityArrayResponseType = HttpResponse<IAutreCommerce[]>;

@Injectable({ providedIn: 'root' })
export class AutreCommerceService {
  public resourceUrl = SERVER_API_URL + 'api/autre-commerces';

  constructor(protected http: HttpClient) {}

  create(autreCommerce: IAutreCommerce): Observable<EntityResponseType> {
    return this.http.post<IAutreCommerce>(this.resourceUrl, autreCommerce, { observe: 'response' });
  }

  update(autreCommerce: IAutreCommerce): Observable<EntityResponseType> {
    return this.http.put<IAutreCommerce>(this.resourceUrl, autreCommerce, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAutreCommerce>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAutreCommerce[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
