import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUtilisateur, Utilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';
import { ICommercant } from 'app/shared/model/commercant.model';
import { CommercantService } from 'app/entities/commercant/commercant.service';
import { ICoursier } from 'app/shared/model/coursier.model';
import { CoursierService } from 'app/entities/coursier/coursier.service';

type SelectableEntity = IClient | ICommercant | ICoursier;

@Component({
  selector: 'jhi-utilisateur-update',
  templateUrl: './utilisateur-update.component.html',
})
export class UtilisateurUpdateComponent implements OnInit {
  isSaving = false;
  clients: IClient[] = [];
  commercants: ICommercant[] = [];
  coursiers: ICoursier[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.pattern('^[A-Z][a-z]+\\d$')]],
    firstname: [null, [Validators.required, Validators.pattern('^[A-Z][a-z]+\\d$')]],
    mail: [null, [Validators.required]],
    tel: [null, [Validators.required]],
    client: [],
    commercant: [],
    coursier: [],
  });

  constructor(
    protected utilisateurService: UtilisateurService,
    protected clientService: ClientService,
    protected commercantService: CommercantService,
    protected coursierService: CoursierService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ utilisateur }) => {
      this.updateForm(utilisateur);

      this.clientService
        .query({ filter: 'utilisateur-is-null' })
        .pipe(
          map((res: HttpResponse<IClient[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IClient[]) => {
          if (!utilisateur.client || !utilisateur.client.id) {
            this.clients = resBody;
          } else {
            this.clientService
              .find(utilisateur.client.id)
              .pipe(
                map((subRes: HttpResponse<IClient>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IClient[]) => (this.clients = concatRes));
          }
        });

      this.commercantService
        .query({ filter: 'utilisateur-is-null' })
        .pipe(
          map((res: HttpResponse<ICommercant[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICommercant[]) => {
          if (!utilisateur.commercant || !utilisateur.commercant.id) {
            this.commercants = resBody;
          } else {
            this.commercantService
              .find(utilisateur.commercant.id)
              .pipe(
                map((subRes: HttpResponse<ICommercant>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICommercant[]) => (this.commercants = concatRes));
          }
        });

      this.coursierService
        .query({ filter: 'utilisateur-is-null' })
        .pipe(
          map((res: HttpResponse<ICoursier[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICoursier[]) => {
          if (!utilisateur.coursier || !utilisateur.coursier.id) {
            this.coursiers = resBody;
          } else {
            this.coursierService
              .find(utilisateur.coursier.id)
              .pipe(
                map((subRes: HttpResponse<ICoursier>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICoursier[]) => (this.coursiers = concatRes));
          }
        });
    });
  }

  updateForm(utilisateur: IUtilisateur): void {
    this.editForm.patchValue({
      id: utilisateur.id,
      name: utilisateur.name,
      firstname: utilisateur.firstname,
      mail: utilisateur.mail,
      tel: utilisateur.tel,
      client: utilisateur.client,
      commercant: utilisateur.commercant,
      coursier: utilisateur.coursier,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const utilisateur = this.createFromForm();
    if (utilisateur.id !== undefined) {
      this.subscribeToSaveResponse(this.utilisateurService.update(utilisateur));
    } else {
      this.subscribeToSaveResponse(this.utilisateurService.create(utilisateur));
    }
  }

  private createFromForm(): IUtilisateur {
    return {
      ...new Utilisateur(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      firstname: this.editForm.get(['firstname'])!.value,
      mail: this.editForm.get(['mail'])!.value,
      tel: this.editForm.get(['tel'])!.value,
      client: this.editForm.get(['client'])!.value,
      commercant: this.editForm.get(['commercant'])!.value,
      coursier: this.editForm.get(['coursier'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUtilisateur>>): void {
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
