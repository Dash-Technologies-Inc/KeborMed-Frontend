import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';
import { TranslateModule } from '@ngx-translate/core';
import { UserComponent } from './view-page/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ImportDialogComponent } from './import-dialog/import-dialog.component';
import { ListSearchComponent } from '../../shared/list-search/list-search.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { ConfirmDirective } from '../../shared/directive/confirmation.directive';
import { DropdownMenuDirective } from '../../shared/directive/dropdown-directive/dropdown.directive';

@NgModule({
  declarations: [UserComponent,UserListComponent,UserFormComponent,ImportDialogComponent],
  imports: [
    CommonModule,
    ListSearchComponent,
    PaginationComponent,
    HttpClientModule,
    MatButtonModule,
    CdkTableModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ConfirmDirective,
    DropdownMenuDirective,
    RouterModule.forChild([
      { path: '', component: UserComponent },
    ]),
  ],
})
export class UserModule {}
