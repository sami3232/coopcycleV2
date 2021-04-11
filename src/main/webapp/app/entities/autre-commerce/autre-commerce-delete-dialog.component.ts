import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAutreCommerce } from 'app/shared/model/autre-commerce.model';
import { AutreCommerceService } from './autre-commerce.service';

@Component({
  templateUrl: './autre-commerce-delete-dialog.component.html',
})
export class AutreCommerceDeleteDialogComponent {
  autreCommerce?: IAutreCommerce;

  constructor(
    protected autreCommerceService: AutreCommerceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.autreCommerceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('autreCommerceListModification');
      this.activeModal.close();
    });
  }
}
