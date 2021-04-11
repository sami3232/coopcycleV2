import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICoursier, Coursier } from 'app/shared/model/coursier.model';
import { CoursierService } from './coursier.service';
import { CoursierComponent } from './coursier.component';
import { CoursierDetailComponent } from './coursier-detail.component';
import { CoursierUpdateComponent } from './coursier-update.component';

@Injectable({ providedIn: 'root' })
export class CoursierResolve implements Resolve<ICoursier> {
  constructor(private service: CoursierService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICoursier> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((coursier: HttpResponse<Coursier>) => {
          if (coursier.body) {
            return of(coursier.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Coursier());
  }
}

export const coursierRoute: Routes = [
  {
    path: '',
    component: CoursierComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.coursier.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CoursierDetailComponent,
    resolve: {
      coursier: CoursierResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.coursier.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CoursierUpdateComponent,
    resolve: {
      coursier: CoursierResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.coursier.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CoursierUpdateComponent,
    resolve: {
      coursier: CoursierResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.coursier.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
