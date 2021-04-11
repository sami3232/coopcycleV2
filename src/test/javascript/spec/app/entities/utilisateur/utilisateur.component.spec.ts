import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleTestModule } from '../../../test.module';
import { UtilisateurComponent } from 'app/entities/utilisateur/utilisateur.component';
import { UtilisateurService } from 'app/entities/utilisateur/utilisateur.service';
import { Utilisateur } from 'app/shared/model/utilisateur.model';

describe('Component Tests', () => {
  describe('Utilisateur Management Component', () => {
    let comp: UtilisateurComponent;
    let fixture: ComponentFixture<UtilisateurComponent>;
    let service: UtilisateurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [UtilisateurComponent],
      })
        .overrideTemplate(UtilisateurComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UtilisateurComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UtilisateurService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Utilisateur(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.utilisateurs && comp.utilisateurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
