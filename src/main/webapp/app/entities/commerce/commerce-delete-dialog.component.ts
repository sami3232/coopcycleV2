import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommerce } from 'app/shared/model/commerce.model';
import { CommerceService } from './commerce.service';

@Component({
  templateUrl: './commerce-delete-dialog.component.html',
})
export class CommerceDeleteDialogComponent {
  commerce?: ICommerce;

  constructor(protected commerceService: CommerceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.commerceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('commerceListModification');
      this.activeModal.close();
    });
  }
}
