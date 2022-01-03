import { Directive, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';

@Directive({
  selector: '[HashColonInnerHtmlObserver]'
})
export class InnerHtmlObserverDirective implements OnDestroy {

  _observer: MutationObserver;
  @Output() innerHtmlRendered = new EventEmitter();

  constructor(private el: ElementRef) {
    this._observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation, index) => {
        if (mutation.type === 'childList') {
          this.innerHtmlRendered.emit();
        }
      });
    });
    this._observer.observe(
      this.el.nativeElement,
      { attributes: true, childList: true, characterData: true }
    );
  }

  ngOnDestroy() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }

}
