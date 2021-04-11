import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleTestModule } from '../../../test.module';
import { AutreCommerceComponent } from 'app/entities/autre-commerce/autre-commerce.component';
import { AutreCommerceService } from 'app/entities/autre-commerce/autre-commerce.service';
import { AutreCommerce } from 'app/shared/model/autre-commerce.model';

describe('Component Tests', () => {
  describe('AutreCommerce Management Component', () => {
    let comp: AutreCommerceComponent;
    let fixture: ComponentFixture<AutreCommerceComponent>;
    let service: AutreCommerceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [AutreCommerceComponent],
      })
        .overrideTemplate(AutreCommerceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AutreCommerceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AutreCommerceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AutreCommerce(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.autreCommerces && comp.autreCommerces[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
