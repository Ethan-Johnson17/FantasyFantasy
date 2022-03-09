import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

export interface CarouselContext {
  $implicit: string;
  controller: {
    next: () => void;
    prev: () => void;
  };
}

@Directive({
  selector: '[appSchedule]',
})
export class ScheduleDirective implements OnInit {
  context!: CarouselContext;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}
  @Input('appScheduleFrom') opponents!: string[];
  index = 0;

  next() {
    this.index++;
    if (this.index >= this.opponents.length) {
      this.index = 0;
    }
    this.context.$implicit = this.opponents[this.index];
  }

  prev() {
    this.index--;
    if (this.index < 0) {
      this.index = this.opponents.length - 1;
    }
    this.context.$implicit = this.opponents[this.index];
  }

  ngOnInit(): void {
    this.context = {
      $implicit: this.opponents[0],
      controller: {
        next: () => this.next(),
        prev: () => this.prev(),
      },
    };

    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }
}
