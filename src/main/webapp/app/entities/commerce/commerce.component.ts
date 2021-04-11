import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICommerce } from 'app/shared/model/commerce.model';
import { CommerceService } from './commerce.service';
import { CommerceDeleteDialogComponent } from './commerce-delete-dialog.component';

@Component({
  selector: 'jhi-commerce',
  templateUrl: './commerce.component.html',
})
export class CommerceComponent implements OnInit, OnDestroy {
  commerce?: ICommerce[];
  eventSubscriber?: Subscription;

  constructor(protected commerceService: CommerceService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.commerceService.query().subscribe((res: HttpResponse<ICommerce[]>) => (this.commerce = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCommerce();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICommerce): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCommerce(): void {
    this.eventSubscriber = this.eventManager.subscribe('commerceListModification', () => this.loadAll());
  }

  delete(commerce: ICommerce): void {
    const modalRef = this.modalService.open(CommerceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.commerce = commerce;
  }
}
