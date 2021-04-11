import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { CommercantDetailComponent } from 'app/entities/commercant/commercant-detail.component';
import { Commercant } from 'app/shared/model/commercant.model';

describe('Component Tests', () => {
  describe('Commercant Management Detail Component', () => {
    let comp: CommercantDetailComponent;
    let fixture: ComponentFixture<CommercantDetailComponent>;
    const route = ({ data: of({ commercant: new Commercant(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [CommercantDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CommercantDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommercantDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load commercant on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.commercant).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
