export interface ImcWeightMetrics {
  [index: number]: number[]
}

export enum ImcWeightMetricsLevel {
  NOT_FOUND = 0,
  LOWER = 1,
  NORMAL = 2,
  OVER_WEIGHT = 3,
  OBESITY_LOWER = 4,
  OBESITY_NORMAL = 5,
  OBESITY_HEIGHT = 6,
}
