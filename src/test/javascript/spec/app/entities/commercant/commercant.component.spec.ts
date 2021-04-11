import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleTestModule } from '../../../test.module';
import { CommercantComponent } from 'app/entities/commercant/commercant.component';
import { CommercantService } from 'app/entities/commercant/commercant.service';
import { Commercant } from 'app/shared/model/commercant.model';

describe('Component Tests', () => {
  describe('Commercant Management Component', () => {
    let comp: CommercantComponent;
    let fixture: ComponentFixture<CommercantComponent>;
    let service: CommercantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [CommercantComponent],
      })
        .overrideTemplate(CommercantComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommercantComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommercantService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Commercant(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.commercants && comp.commercants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
