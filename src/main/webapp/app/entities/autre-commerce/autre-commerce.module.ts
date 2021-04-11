import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoopcycleSharedModule } from 'app/shared/shared.module';
import { AutreCommerceComponent } from './autre-commerce.component';
import { AutreCommerceDetailComponent } from './autre-commerce-detail.component';
import { AutreCommerceUpdateComponent } from './autre-commerce-update.component';
import { AutreCommerceDeleteDialogComponent } from './autre-commerce-delete-dialog.component';
import { autreCommerceRoute } from './autre-commerce.route';

@NgModule({
  imports: [CoopcycleSharedModule, RouterModule.forChild(autreCommerceRoute)],
  declarations: [AutreCommerceComponent, AutreCommerceDetailComponent, AutreCommerceUpdateComponent, AutreCommerceDeleteDialogComponent],
  entryComponents: [AutreCommerceDeleteDialogComponent],
})
export class CoopcycleAutreCommerceModule {}
