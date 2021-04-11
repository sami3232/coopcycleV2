import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoopcycleSharedModule } from 'app/shared/shared.module';
import { PanierComponent } from './panier.component';
import { PanierDetailComponent } from './panier-detail.component';
import { PanierUpdateComponent } from './panier-update.component';
import { PanierDeleteDialogComponent } from './panier-delete-dialog.component';
import { panierRoute } from './panier.route';

@NgModule({
  imports: [CoopcycleSharedModule, RouterModule.forChild(panierRoute)],
  declarations: [PanierComponent, PanierDetailComponent, PanierUpdateComponent, PanierDeleteDialogComponent],
  entryComponents: [PanierDeleteDialogComponent],
})
export class CoopcyclePanierModule {}
