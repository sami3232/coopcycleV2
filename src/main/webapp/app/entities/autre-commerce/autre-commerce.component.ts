import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAutreCommerce } from 'app/shared/model/autre-commerce.model';
import { AutreCommerceService } from './autre-commerce.service';
import { AutreCommerceDeleteDialogComponent } from './autre-commerce-delete-dialog.component';

@Component({
  selector: 'jhi-autre-commerce',
  templateUrl: './autre-commerce.component.html',
})
export class AutreCommerceComponent implements OnInit, OnDestroy {
  autreCommerces?: IAutreCommerce[];
  eventSubscriber?: Subscription;

  constructor(
    protected autreCommerceService: AutreCommerceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.autreCommerceService.query().subscribe((res: HttpResponse<IAutreCommerce[]>) => (this.autreCommerces = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAutreCommerces();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAutreCommerce): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAutreCommerces(): void {
    this.eventSubscriber = this.eventManager.subscribe('autreCommerceListModification', () => this.loadAll());
  }

  delete(autreCommerce: IAutreCommerce): void {
    const modalRef = this.modalService.open(AutreCommerceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.autreCommerce = autreCommerce;
  }
}
