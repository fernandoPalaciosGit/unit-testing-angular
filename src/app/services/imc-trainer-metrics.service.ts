import { Injectable } from '@angular/core';
import { ImcWeightMetrics, ImcWeightMetricsLevel } from '../interfaces/im-weight-metrics';

@Injectable({
  providedIn: 'root'
})
export class ImcTrainerMetricsService {
  private static readonly imcWeightMetrics: ImcWeightMetrics = {
    [ImcWeightMetricsLevel.LOWER]: [0, 18],
    [ImcWeightMetricsLevel.NORMAL]: [18, 24.9],
    [ImcWeightMetricsLevel.OVER_WEIGHT]: [25, 26.9],
    [ImcWeightMetricsLevel.OBESITY_LOWER]: [27, 29.9],
    [ImcWeightMetricsLevel.OBESITY_NORMAL]: [30, 39.9],
    [ImcWeightMetricsLevel.OBESITY_HEIGHT]: [40, 100]
  };

  constructor() {}

  static validate(weight: number, height: number): ImcWeightMetricsLevel {
    if (weight < 0 || height < 0) {
      return ImcWeightMetricsLevel.NOT_FOUND;
    }
    for (const type in ImcTrainerMetricsService.imcWeightMetrics) {
      if (ImcTrainerMetricsService.imcWeightMetrics.hasOwnProperty(type)) {
        const [min, max] = ImcTrainerMetricsService.imcWeightMetrics[type];
        const imc = this.getImcValue(weight, height);

        if (imc >= min && imc <= max) {
          return ImcWeightMetricsLevel[ImcWeightMetricsLevel[type]];
        }
      }
    }
    return ImcWeightMetricsLevel.NOT_FOUND;
  }

  private static getImcValue(weight: number, height: number) {
    return Math.ceil(weight / Math.pow(height, 2));
  }
}
