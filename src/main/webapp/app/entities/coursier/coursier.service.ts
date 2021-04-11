import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICoursier } from 'app/shared/model/coursier.model';

type EntityResponseType = HttpResponse<ICoursier>;
type EntityArrayResponseType = HttpResponse<ICoursier[]>;

@Injectable({ providedIn: 'root' })
export class CoursierService {
  public resourceUrl = SERVER_API_URL + 'api/coursiers';

  constructor(protected http: HttpClient) {}

  create(coursier: ICoursier): Observable<EntityResponseType> {
    return this.http.post<ICoursier>(this.resourceUrl, coursier, { observe: 'response' });
  }

  update(coursier: ICoursier): Observable<EntityResponseType> {
    return this.http.put<ICoursier>(this.resourceUrl, coursier, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICoursier>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICoursier[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
