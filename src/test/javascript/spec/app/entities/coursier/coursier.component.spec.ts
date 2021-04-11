import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleTestModule } from '../../../test.module';
import { CoursierComponent } from 'app/entities/coursier/coursier.component';
import { CoursierService } from 'app/entities/coursier/coursier.service';
import { Coursier } from 'app/shared/model/coursier.model';

describe('Component Tests', () => {
  describe('Coursier Management Component', () => {
    let comp: CoursierComponent;
    let fixture: ComponentFixture<CoursierComponent>;
    let service: CoursierService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [CoursierComponent],
      })
        .overrideTemplate(CoursierComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoursierComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoursierService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Coursier(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.coursiers && comp.coursiers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
