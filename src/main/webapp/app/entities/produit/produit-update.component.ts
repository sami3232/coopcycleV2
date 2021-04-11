import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduit, Produit } from 'app/shared/model/produit.model';
import { ProduitService } from './produit.service';
import { ICommerce } from 'app/shared/model/commerce.model';
import { CommerceService } from 'app/entities/commerce/commerce.service';

@Component({
  selector: 'jhi-produit-update',
  templateUrl: './produit-update.component.html',
})
export class ProduitUpdateComponent implements OnInit {
  isSaving = false;
  commerce: ICommerce[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.pattern('^[A-Z][a-z]+\\d$')]],
    prix: [null, [Validators.required, Validators.min(0)]],
    description: [null, [Validators.required]],
    commerce: [],
  });

  constructor(
    protected produitService: ProduitService,
    protected commerceService: CommerceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.updateForm(produit);

      this.commerceService.query().subscribe((res: HttpResponse<ICommerce[]>) => (this.commerce = res.body || []));
    });
  }

  updateForm(produit: IProduit): void {
    this.editForm.patchValue({
      id: produit.id,
      name: produit.name,
      prix: produit.prix,
      description: produit.description,
      commerce: produit.commerce,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produit = this.createFromForm();
    if (produit.id !== undefined) {
      this.subscribeToSaveResponse(this.produitService.update(produit));
    } else {
      this.subscribeToSaveResponse(this.produitService.create(produit));
    }
  }

  private createFromForm(): IProduit {
    return {
      ...new Produit(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      prix: this.editForm.get(['prix'])!.value,
      description: this.editForm.get(['description'])!.value,
      commerce: this.editForm.get(['commerce'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduit>>): void {
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

  trackById(index: number, item: ICommerce): any {
    return item.id;
  }

  getSelected(selectedVals: ICommerce[], option: ICommerce): ICommerce {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
