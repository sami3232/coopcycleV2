import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { AutreCommerceUpdateComponent } from 'app/entities/autre-commerce/autre-commerce-update.component';
import { AutreCommerceService } from 'app/entities/autre-commerce/autre-commerce.service';
import { AutreCommerce } from 'app/shared/model/autre-commerce.model';

describe('Component Tests', () => {
  describe('AutreCommerce Management Update Component', () => {
    let comp: AutreCommerceUpdateComponent;
    let fixture: ComponentFixture<AutreCommerceUpdateComponent>;
    let service: AutreCommerceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [AutreCommerceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AutreCommerceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AutreCommerceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AutreCommerceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AutreCommerce(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AutreCommerce();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
