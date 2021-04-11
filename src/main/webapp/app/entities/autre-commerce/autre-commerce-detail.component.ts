import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAutreCommerce } from 'app/shared/model/autre-commerce.model';

@Component({
  selector: 'jhi-autre-commerce-detail',
  templateUrl: './autre-commerce-detail.component.html',
})
export class AutreCommerceDetailComponent implements OnInit {
  autreCommerce: IAutreCommerce | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ autreCommerce }) => (this.autreCommerce = autreCommerce));
  }

  previousState(): void {
    window.history.back();
  }
}
