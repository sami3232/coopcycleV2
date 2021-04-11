import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICommercant } from 'app/shared/model/commercant.model';
import { CommercantService } from './commercant.service';
import { CommercantDeleteDialogComponent } from './commercant-delete-dialog.component';

@Component({
  selector: 'jhi-commercant',
  templateUrl: './commercant.component.html',
})
export class CommercantComponent implements OnInit, OnDestroy {
  commercants?: ICommercant[];
  eventSubscriber?: Subscription;

  constructor(protected commercantService: CommercantService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.commercantService.query().subscribe((res: HttpResponse<ICommercant[]>) => (this.commercants = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCommercants();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICommercant): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCommercants(): void {
    this.eventSubscriber = this.eventManager.subscribe('commercantListModification', () => this.loadAll());
  }

  delete(commercant: ICommercant): void {
    const modalRef = this.modalService.open(CommercantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.commercant = commercant;
  }
}
