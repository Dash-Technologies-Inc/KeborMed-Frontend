import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';
import { TranslateModule } from '@ngx-translate/core';
import { UserComponent } from './view-page/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent,UserListComponent,UserFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    CdkTableModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: UserComponent },
    ]),
  ],
})
export class UserModule {}
