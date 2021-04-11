import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { CoursierUpdateComponent } from 'app/entities/coursier/coursier-update.component';
import { CoursierService } from 'app/entities/coursier/coursier.service';
import { Coursier } from 'app/shared/model/coursier.model';

describe('Component Tests', () => {
  describe('Coursier Management Update Component', () => {
    let comp: CoursierUpdateComponent;
    let fixture: ComponentFixture<CoursierUpdateComponent>;
    let service: CoursierService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [CoursierUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CoursierUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoursierUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoursierService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Coursier(123);
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
        const entity = new Coursier();
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
