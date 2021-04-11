import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICommerce, Commerce } from 'app/shared/model/commerce.model';
import { CommerceService } from './commerce.service';
import { CommerceComponent } from './commerce.component';
import { CommerceDetailComponent } from './commerce-detail.component';
import { CommerceUpdateComponent } from './commerce-update.component';

@Injectable({ providedIn: 'root' })
export class CommerceResolve implements Resolve<ICommerce> {
  constructor(private service: CommerceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICommerce> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((commerce: HttpResponse<Commerce>) => {
          if (commerce.body) {
            return of(commerce.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Commerce());
  }
}

export const commerceRoute: Routes = [
  {
    path: '',
    component: CommerceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.commerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CommerceDetailComponent,
    resolve: {
      commerce: CommerceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.commerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CommerceUpdateComponent,
    resolve: {
      commerce: CommerceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.commerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CommerceUpdateComponent,
    resolve: {
      commerce: CommerceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.commerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
