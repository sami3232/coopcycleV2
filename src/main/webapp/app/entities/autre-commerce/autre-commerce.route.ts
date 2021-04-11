import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAutreCommerce, AutreCommerce } from 'app/shared/model/autre-commerce.model';
import { AutreCommerceService } from './autre-commerce.service';
import { AutreCommerceComponent } from './autre-commerce.component';
import { AutreCommerceDetailComponent } from './autre-commerce-detail.component';
import { AutreCommerceUpdateComponent } from './autre-commerce-update.component';

@Injectable({ providedIn: 'root' })
export class AutreCommerceResolve implements Resolve<IAutreCommerce> {
  constructor(private service: AutreCommerceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAutreCommerce> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((autreCommerce: HttpResponse<AutreCommerce>) => {
          if (autreCommerce.body) {
            return of(autreCommerce.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AutreCommerce());
  }
}

export const autreCommerceRoute: Routes = [
  {
    path: '',
    component: AutreCommerceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.autreCommerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AutreCommerceDetailComponent,
    resolve: {
      autreCommerce: AutreCommerceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.autreCommerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AutreCommerceUpdateComponent,
    resolve: {
      autreCommerce: AutreCommerceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.autreCommerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AutreCommerceUpdateComponent,
    resolve: {
      autreCommerce: AutreCommerceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.autreCommerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
