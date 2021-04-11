import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { CoursierDetailComponent } from 'app/entities/coursier/coursier-detail.component';
import { Coursier } from 'app/shared/model/coursier.model';

describe('Component Tests', () => {
  describe('Coursier Management Detail Component', () => {
    let comp: CoursierDetailComponent;
    let fixture: ComponentFixture<CoursierDetailComponent>;
    const route = ({ data: of({ coursier: new Coursier(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [CoursierDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CoursierDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CoursierDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load coursier on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.coursier).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
