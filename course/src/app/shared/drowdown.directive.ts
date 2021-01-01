import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  //   isOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }

  @HostListener('mouseup') toggle = () => {
    // if (this.isOpen) {
    //   this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    // } else {
    //   this.renderer.addClass(this.elementRef.nativeElement, 'open');
    // }
    // this.isOpen = !this.isOpen;
  };
}
