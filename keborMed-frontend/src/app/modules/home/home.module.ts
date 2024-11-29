import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CdkTableModule } from '@angular/cdk/table'; // For CdkTable
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CdkTableModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
    ]),
  ],
})
export class HomeModule {}
