import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.CoopcycleClientModule),
      },
      {
        path: 'coursier',
        loadChildren: () => import('./coursier/coursier.module').then(m => m.CoopcycleCoursierModule),
      },
      {
        path: 'commercant',
        loadChildren: () => import('./commercant/commercant.module').then(m => m.CoopcycleCommercantModule),
      },
      {
        path: 'utilisateur',
        loadChildren: () => import('./utilisateur/utilisateur.module').then(m => m.CoopcycleUtilisateurModule),
      },
      {
        path: 'panier',
        loadChildren: () => import('./panier/panier.module').then(m => m.CoopcyclePanierModule),
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CoopcycleCourseModule),
      },
      {
        path: 'produit',
        loadChildren: () => import('./produit/produit.module').then(m => m.CoopcycleProduitModule),
      },
      {
        path: 'commerce',
        loadChildren: () => import('./commerce/commerce.module').then(m => m.CoopcycleCommerceModule),
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.CoopcycleRestaurantModule),
      },
      {
        path: 'autre-commerce',
        loadChildren: () => import('./autre-commerce/autre-commerce.module').then(m => m.CoopcycleAutreCommerceModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class CoopcycleEntityModule {}
