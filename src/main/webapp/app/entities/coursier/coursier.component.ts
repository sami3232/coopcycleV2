import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICoursier } from 'app/shared/model/coursier.model';
import { CoursierService } from './coursier.service';
import { CoursierDeleteDialogComponent } from './coursier-delete-dialog.component';

@Component({
  selector: 'jhi-coursier',
  templateUrl: './coursier.component.html',
})
export class CoursierComponent implements OnInit, OnDestroy {
  coursiers?: ICoursier[];
  eventSubscriber?: Subscription;

  constructor(protected coursierService: CoursierService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.coursierService.query().subscribe((res: HttpResponse<ICoursier[]>) => (this.coursiers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCoursiers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICoursier): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCoursiers(): void {
    this.eventSubscriber = this.eventManager.subscribe('coursierListModification', () => this.loadAll());
  }

  delete(coursier: ICoursier): void {
    const modalRef = this.modalService.open(CoursierDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.coursier = coursier;
  }
}
