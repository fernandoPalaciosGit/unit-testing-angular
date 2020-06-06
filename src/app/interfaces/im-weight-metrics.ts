export enum ImcLevel {
  NOT_FOUND = 0,
  LOWER = 1,
  NORMAL = 2,
  OVER_WEIGHT = 3,
  OBESITY_LOWER = 4,
  OBESITY_NORMAL = 5,
  OBESITY_HEIGHT = 6,
}

export type ImcMetricLevel = {
  [index in ImcLevel]: number[];
}
