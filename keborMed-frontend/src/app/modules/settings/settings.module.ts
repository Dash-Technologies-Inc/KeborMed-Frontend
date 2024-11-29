import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './view-page/settings.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: SettingsComponent },
    ]),
  ],
})
export class SettingsModule {}
