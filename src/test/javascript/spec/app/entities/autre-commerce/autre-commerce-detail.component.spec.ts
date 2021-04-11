import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { AutreCommerceDetailComponent } from 'app/entities/autre-commerce/autre-commerce-detail.component';
import { AutreCommerce } from 'app/shared/model/autre-commerce.model';

describe('Component Tests', () => {
  describe('AutreCommerce Management Detail Component', () => {
    let comp: AutreCommerceDetailComponent;
    let fixture: ComponentFixture<AutreCommerceDetailComponent>;
    const route = ({ data: of({ autreCommerce: new AutreCommerce(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [AutreCommerceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AutreCommerceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AutreCommerceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load autreCommerce on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.autreCommerce).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
