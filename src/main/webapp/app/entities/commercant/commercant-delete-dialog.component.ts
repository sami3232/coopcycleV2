import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommercant } from 'app/shared/model/commercant.model';
import { CommercantService } from './commercant.service';

@Component({
  templateUrl: './commercant-delete-dialog.component.html',
})
export class CommercantDeleteDialogComponent {
  commercant?: ICommercant;

  constructor(
    protected commercantService: CommercantService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.commercantService.delete(id).subscribe(() => {
      this.eventManager.broadcast('commercantListModification');
      this.activeModal.close();
    });
  }
}
