import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UserComponent,UserListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: UserComponent },
    ]),
  ],
})
export class UserModule {}
