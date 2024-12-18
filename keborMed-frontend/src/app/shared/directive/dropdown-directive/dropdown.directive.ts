import {
  Directive,
  Input,
  EventEmitter,
  Output,
  HostListener,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
} from '@angular/core';
import { DropdownMenuComponent } from '../../dropdown-menu/dropdown-menu.component';

@Directive({
  selector: '[appDropdownMenu]',
  standalone: true,
})
export class DropdownMenuDirective {
  @Input('appDropdownMenu') dropdownItems: { label: string; action: string }[] = [];
  @Output() menuSelect = new EventEmitter<string>();

  private dropdownRef: ComponentRef<DropdownMenuComponent> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private el: ElementRef
  ) {}

  @HostListener('click', ['$event'])
  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation(); // Prevent the event from propagating

    if (this.dropdownRef) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    const factory = this.resolver.resolveComponentFactory(DropdownMenuComponent);
    this.dropdownRef = this.viewContainerRef.createComponent(factory);
  
    this.dropdownRef.instance.items = this.dropdownItems;
    this.dropdownRef.instance.itemSelected.subscribe((action: string) => {
      this.menuSelect.emit(action);
      this.closeDropdown();
    });
  
    // Position dropdown correctly
    const hostEl = this.el.nativeElement as HTMLElement;
    const rect = hostEl.getBoundingClientRect();
  
    const dropdownEl = this.dropdownRef.location.nativeElement as HTMLElement;
    dropdownEl.style.position = 'absolute';
    dropdownEl.style.top = `${rect.bottom + window.scrollY}px`; // Adjust for scrolling
    dropdownEl.style.left = `${rect.left}px`;
    dropdownEl.style.zIndex = '1000';
  }
  

  closeDropdown(): void {
    if (this.dropdownRef) {
      this.dropdownRef.destroy();
      this.dropdownRef = null;
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  private handleOutsideClick = (): void => {
    this.closeDropdown();
  };
}
