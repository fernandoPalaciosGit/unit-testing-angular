import { Component, Input, OnInit } from '@angular/core';
import { ImcTrainerMetricsService } from '../../services/imc-trainer-metrics.service';
import { ImcLevel } from '../../models/im-weight-metrics';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html'
})
export class PersonComponent implements OnInit {
  @Input() height: number;
  @Input() weight: number;
  private imc: ImcLevel | string;

  constructor() {
  }

  ngOnInit(): void {
    this.imc = ImcTrainerMetricsService.validate(this.weight, this.height);
  }
}
