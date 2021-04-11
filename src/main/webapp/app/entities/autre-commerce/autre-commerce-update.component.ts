import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAutreCommerce, AutreCommerce } from 'app/shared/model/autre-commerce.model';
import { AutreCommerceService } from './autre-commerce.service';

@Component({
  selector: 'jhi-autre-commerce-update',
  templateUrl: './autre-commerce-update.component.html',
})
export class AutreCommerceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    typeCommerce: [null, [Validators.required]],
  });

  constructor(protected autreCommerceService: AutreCommerceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ autreCommerce }) => {
      this.updateForm(autreCommerce);
    });
  }

  updateForm(autreCommerce: IAutreCommerce): void {
    this.editForm.patchValue({
      id: autreCommerce.id,
      typeCommerce: autreCommerce.typeCommerce,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const autreCommerce = this.createFromForm();
    if (autreCommerce.id !== undefined) {
      this.subscribeToSaveResponse(this.autreCommerceService.update(autreCommerce));
    } else {
      this.subscribeToSaveResponse(this.autreCommerceService.create(autreCommerce));
    }
  }

  private createFromForm(): IAutreCommerce {
    return {
      ...new AutreCommerce(),
      id: this.editForm.get(['id'])!.value,
      typeCommerce: this.editForm.get(['typeCommerce'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAutreCommerce>>): void {
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
}
