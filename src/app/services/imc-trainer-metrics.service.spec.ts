import { TestBed } from '@angular/core/testing';

import { ImcTrainerMetricsService } from './imc-trainer-metrics.service';
import { ImcLevel } from '../interfaces/im-weight-metrics';

describe('ImcTrainerMetricsService', () => {
  let service: ImcTrainerMetricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImcTrainerMetricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validate IMC', () => {
    describe('with the same height', () => {
      const HEIGHT = 1.65;
      let WEIGHT;
      it('should be DOWN', () => {
        WEIGHT = 40;
        expect(ImcTrainerMetricsService.validate(WEIGHT, HEIGHT)).toBe(ImcLevel.LOWER);
      });

      it('should be NORMAL', () => {
        WEIGHT = 58;
        expect(ImcTrainerMetricsService.validate(WEIGHT, HEIGHT)).toBe(ImcLevel.NORMAL);
      });

      it('should be OVER_WEIGHT', () => {
        WEIGHT = 68;
        expect(ImcTrainerMetricsService.validate(WEIGHT, HEIGHT)).toBe(ImcLevel.OVER_WEIGHT);
      });

      it('should be OBESITY_LOWER', () => {
        WEIGHT = 75;
        expect(ImcTrainerMetricsService.validate(WEIGHT, HEIGHT)).toBe(ImcLevel.OBESITY_LOWER);
      });

      it('should be OBESITY_NORMAL', () => {
        WEIGHT = 90;
        expect(ImcTrainerMetricsService.validate(WEIGHT, HEIGHT)).toBe(ImcLevel.OBESITY_NORMAL);
      });

      it('should be OBESITY_HEIGHT', () => {
        WEIGHT = 120;
        expect(ImcTrainerMetricsService.validate(WEIGHT, HEIGHT)).toBe(ImcLevel.OBESITY_HEIGHT);
      });
    });

    describe('should not fount IMC', () => {
      it('With negative height', () => {
        expect(ImcTrainerMetricsService.validate(40, -1.65)).toBe(ImcLevel.NOT_FOUND);
      });

      it('With negative weight', () => {
        expect(ImcTrainerMetricsService.validate(-40, 1.65)).toBe(ImcLevel.NOT_FOUND);
      });

      it('with a IMC over level controlled', () => {
        expect(ImcTrainerMetricsService.validate(200, 1.30)).toBe(ImcLevel.NOT_FOUND);
      });
    });
  });
});
