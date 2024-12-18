import { Directive, EventEmitter, HostListener, Input, Output, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Directive({
  selector: '[uiConfirm]',
  standalone : true
})
export class ConfirmDirective implements OnDestroy {
  private readonly subs = new Subscription();

  @Output('uiConfirm') confirm = new EventEmitter<boolean>();
  @Input() title: string = 'Confirmation';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() requireInput: boolean = false;
  @Input() expectedInput: string = '';

  constructor(private readonly matDialog: MatDialog) {}

  @HostListener('click') onClick(): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data: {
        title: this.title,
        message: this.message,
        requireInput: this.requireInput,
        expectedInput: this.expectedInput,
      },
    });

    this.subs.add(
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        this.confirm.emit(confirmed);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
