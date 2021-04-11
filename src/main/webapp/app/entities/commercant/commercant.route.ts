import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICommercant, Commercant } from 'app/shared/model/commercant.model';
import { CommercantService } from './commercant.service';
import { CommercantComponent } from './commercant.component';
import { CommercantDetailComponent } from './commercant-detail.component';
import { CommercantUpdateComponent } from './commercant-update.component';

@Injectable({ providedIn: 'root' })
export class CommercantResolve implements Resolve<ICommercant> {
  constructor(private service: CommercantService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICommercant> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((commercant: HttpResponse<Commercant>) => {
          if (commercant.body) {
            return of(commercant.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Commercant());
  }
}

export const commercantRoute: Routes = [
  {
    path: '',
    component: CommercantComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.commercant.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CommercantDetailComponent,
    resolve: {
      commercant: CommercantResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.commercant.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CommercantUpdateComponent,
    resolve: {
      commercant: CommercantResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.commercant.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CommercantUpdateComponent,
    resolve: {
      commercant: CommercantResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.commercant.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
