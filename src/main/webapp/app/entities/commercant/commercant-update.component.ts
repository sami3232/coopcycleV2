import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICommercant, Commercant } from 'app/shared/model/commercant.model';
import { CommercantService } from './commercant.service';

@Component({
  selector: 'jhi-commercant-update',
  templateUrl: './commercant-update.component.html',
})
export class CommercantUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    adresse: [null, [Validators.required]],
  });

  constructor(protected commercantService: CommercantService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commercant }) => {
      this.updateForm(commercant);
    });
  }

  updateForm(commercant: ICommercant): void {
    this.editForm.patchValue({
      id: commercant.id,
      adresse: commercant.adresse,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commercant = this.createFromForm();
    if (commercant.id !== undefined) {
      this.subscribeToSaveResponse(this.commercantService.update(commercant));
    } else {
      this.subscribeToSaveResponse(this.commercantService.create(commercant));
    }
  }

  private createFromForm(): ICommercant {
    return {
      ...new Commercant(),
      id: this.editForm.get(['id'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommercant>>): void {
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
