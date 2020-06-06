import { Injectable } from '@angular/core';
import { ImcMetricLevel, ImcLevel } from '../interfaces/im-weight-metrics';

@Injectable({
  providedIn: 'root'
})
export class ImcTrainerMetricsService {
  private static readonly imcWeightMetrics: Partial<ImcMetricLevel> = {
    [ImcLevel.LOWER]: [0, 18],
    [ImcLevel.NORMAL]: [18, 24.9],
    [ImcLevel.OVER_WEIGHT]: [25, 26.9],
    [ImcLevel.OBESITY_LOWER]: [27, 29.9],
    [ImcLevel.OBESITY_NORMAL]: [30, 39.9],
    [ImcLevel.OBESITY_HEIGHT]: [40, 100]
  };

  constructor() {}

  static validate(weight: number, height: number): ImcLevel | string {
    if (weight < 0 || height < 0) {
      return ImcLevel.NOT_FOUND;
    }
    for (const type in ImcTrainerMetricsService.imcWeightMetrics) {
      if (ImcTrainerMetricsService.imcWeightMetrics.hasOwnProperty(type)) {
        const [min, max] = ImcTrainerMetricsService.imcWeightMetrics[type];
        const imc = this.getImcValue(weight, height);
        const hasImcMetric = imc >= min && imc <= max;

        if (hasImcMetric) {
          return ImcLevel[ImcLevel[type]];
        }
      }
    }
    return ImcLevel.NOT_FOUND;
  }

  private static getImcValue(weight: number, height: number) {
    return Math.ceil(weight / Math.pow(height, 2));
  }
}
