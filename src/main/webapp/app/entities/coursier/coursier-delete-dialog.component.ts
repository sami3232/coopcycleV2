import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICoursier } from 'app/shared/model/coursier.model';
import { CoursierService } from './coursier.service';

@Component({
  templateUrl: './coursier-delete-dialog.component.html',
})
export class CoursierDeleteDialogComponent {
  coursier?: ICoursier;

  constructor(protected coursierService: CoursierService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.coursierService.delete(id).subscribe(() => {
      this.eventManager.broadcast('coursierListModification');
      this.activeModal.close();
    });
  }
}
