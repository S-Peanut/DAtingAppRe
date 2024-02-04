import { Component, EventEmitter, Output } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { interval } from 'rxjs';

@Component({
  selector: 'base-slider',
  templateUrl: './base-slider.component.html',
  styleUrls: ['./base-slider.component.scss'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 5000, noPause: true, showIndicators: true },
    },
  ],
})
export class BaseSliderComponent {
  @Output() registerToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  RegisterToggle() {
    this.registerToggle.emit();
  }
}
