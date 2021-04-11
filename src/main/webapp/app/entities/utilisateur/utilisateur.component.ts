import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurDeleteDialogComponent } from './utilisateur-delete-dialog.component';

@Component({
  selector: 'jhi-utilisateur',
  templateUrl: './utilisateur.component.html',
})
export class UtilisateurComponent implements OnInit, OnDestroy {
  utilisateurs?: IUtilisateur[];
  eventSubscriber?: Subscription;

  constructor(
    protected utilisateurService: UtilisateurService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.utilisateurService.query().subscribe((res: HttpResponse<IUtilisateur[]>) => (this.utilisateurs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUtilisateurs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUtilisateur): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUtilisateurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('utilisateurListModification', () => this.loadAll());
  }

  delete(utilisateur: IUtilisateur): void {
    const modalRef = this.modalService.open(UtilisateurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.utilisateur = utilisateur;
  }
}
