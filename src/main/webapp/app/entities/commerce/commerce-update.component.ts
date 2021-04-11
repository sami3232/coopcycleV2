import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICommerce, Commerce } from 'app/shared/model/commerce.model';
import { CommerceService } from './commerce.service';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from 'app/entities/utilisateur/utilisateur.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/restaurant.service';
import { IAutreCommerce } from 'app/shared/model/autre-commerce.model';
import { AutreCommerceService } from 'app/entities/autre-commerce/autre-commerce.service';
import { IPanier } from 'app/shared/model/panier.model';
import { PanierService } from 'app/entities/panier/panier.service';

type SelectableEntity = IUtilisateur | IRestaurant | IAutreCommerce | IPanier;

@Component({
  selector: 'jhi-commerce-update',
  templateUrl: './commerce-update.component.html',
})
export class CommerceUpdateComponent implements OnInit {
  isSaving = false;
  utilisateurs: IUtilisateur[] = [];
  restaurants: IRestaurant[] = [];
  autrecommerces: IAutreCommerce[] = [];
  paniers: IPanier[] = [];

  editForm = this.fb.group({
    id: [],
    adresse: [null, [Validators.required]],
    name: [null, [Validators.required]],
    noteCommerce: [null, [Validators.min(0), Validators.max(5)]],
    utilisateur: [],
    restaurant: [],
    autreCommerce: [],
    panier: [],
  });

  constructor(
    protected commerceService: CommerceService,
    protected utilisateurService: UtilisateurService,
    protected restaurantService: RestaurantService,
    protected autreCommerceService: AutreCommerceService,
    protected panierService: PanierService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commerce }) => {
      this.updateForm(commerce);

      this.utilisateurService
        .query({ filter: 'commerce-is-null' })
        .pipe(
          map((res: HttpResponse<IUtilisateur[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IUtilisateur[]) => {
          if (!commerce.utilisateur || !commerce.utilisateur.id) {
            this.utilisateurs = resBody;
          } else {
            this.utilisateurService
              .find(commerce.utilisateur.id)
              .pipe(
                map((subRes: HttpResponse<IUtilisateur>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IUtilisateur[]) => (this.utilisateurs = concatRes));
          }
        });

      this.restaurantService
        .query({ filter: 'commerce-is-null' })
        .pipe(
          map((res: HttpResponse<IRestaurant[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRestaurant[]) => {
          if (!commerce.restaurant || !commerce.restaurant.id) {
            this.restaurants = resBody;
          } else {
            this.restaurantService
              .find(commerce.restaurant.id)
              .pipe(
                map((subRes: HttpResponse<IRestaurant>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRestaurant[]) => (this.restaurants = concatRes));
          }
        });

      this.autreCommerceService
        .query({ filter: 'commerce-is-null' })
        .pipe(
          map((res: HttpResponse<IAutreCommerce[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAutreCommerce[]) => {
          if (!commerce.autreCommerce || !commerce.autreCommerce.id) {
            this.autrecommerces = resBody;
          } else {
            this.autreCommerceService
              .find(commerce.autreCommerce.id)
              .pipe(
                map((subRes: HttpResponse<IAutreCommerce>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAutreCommerce[]) => (this.autrecommerces = concatRes));
          }
        });

      this.panierService.query().subscribe((res: HttpResponse<IPanier[]>) => (this.paniers = res.body || []));
    });
  }

  updateForm(commerce: ICommerce): void {
    this.editForm.patchValue({
      id: commerce.id,
      adresse: commerce.adresse,
      name: commerce.name,
      noteCommerce: commerce.noteCommerce,
      utilisateur: commerce.utilisateur,
      restaurant: commerce.restaurant,
      autreCommerce: commerce.autreCommerce,
      panier: commerce.panier,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commerce = this.createFromForm();
    if (commerce.id !== undefined) {
      this.subscribeToSaveResponse(this.commerceService.update(commerce));
    } else {
      this.subscribeToSaveResponse(this.commerceService.create(commerce));
    }
  }

  private createFromForm(): ICommerce {
    return {
      ...new Commerce(),
      id: this.editForm.get(['id'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      name: this.editForm.get(['name'])!.value,
      noteCommerce: this.editForm.get(['noteCommerce'])!.value,
      utilisateur: this.editForm.get(['utilisateur'])!.value,
      restaurant: this.editForm.get(['restaurant'])!.value,
      autreCommerce: this.editForm.get(['autreCommerce'])!.value,
      panier: this.editForm.get(['panier'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommerce>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
