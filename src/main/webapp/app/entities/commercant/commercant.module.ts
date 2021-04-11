import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoopcycleSharedModule } from 'app/shared/shared.module';
import { CommercantComponent } from './commercant.component';
import { CommercantDetailComponent } from './commercant-detail.component';
import { CommercantUpdateComponent } from './commercant-update.component';
import { CommercantDeleteDialogComponent } from './commercant-delete-dialog.component';
import { commercantRoute } from './commercant.route';

@NgModule({
  imports: [CoopcycleSharedModule, RouterModule.forChild(commercantRoute)],
  declarations: [CommercantComponent, CommercantDetailComponent, CommercantUpdateComponent, CommercantDeleteDialogComponent],
  entryComponents: [CommercantDeleteDialogComponent],
})
export class CoopcycleCommercantModule {}
