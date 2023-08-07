import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[pkmnBorderCard]',
    standalone: true
})
export class BorderCardDirective {
  private initialColor: string = "#f5f5f5";
  private defaultColorr: string = "#009688";
  private defaultHeight: number = 180;
  
  @Input('pkmnBorderCard') borderColor: string;

  constructor(private refElement: ElementRef) {
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColorr);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  private setHeight(height: number) {
    this.refElement.nativeElement.style.height = `${height}px`;
  }

  private setBorder(color: string) {
    this.refElement.nativeElement.style.border = `solid 4px ${color}`;
  }

}
