import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICommercant } from 'app/shared/model/commercant.model';

type EntityResponseType = HttpResponse<ICommercant>;
type EntityArrayResponseType = HttpResponse<ICommercant[]>;

@Injectable({ providedIn: 'root' })
export class CommercantService {
  public resourceUrl = SERVER_API_URL + 'api/commercants';

  constructor(protected http: HttpClient) {}

  create(commercant: ICommercant): Observable<EntityResponseType> {
    return this.http.post<ICommercant>(this.resourceUrl, commercant, { observe: 'response' });
  }

  update(commercant: ICommercant): Observable<EntityResponseType> {
    return this.http.put<ICommercant>(this.resourceUrl, commercant, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommercant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommercant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
