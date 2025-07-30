import { GroupingField, MetricName } from 'nrel-openpath-deploy-configs';

type TravelMetricName = 'distance' | 'duration' | 'count';

// distance, duration, and count use number values in meters, seconds, and count respectively
// response_count uses object values containing responded and not_responded counts
// footprint uses object values containing kg_co2 and kwh values with optional _uncertain values
export type MetricMeasure<T extends MetricName> = T extends TravelMetricName
  ? number
  : T extends 'response_count'
    ? { responded?: number; not_responded?: number }
    : T extends 'footprint'
      ? { kg_co2: number; kg_co2_uncertain?: number; kwh: number; kwh_uncertain?: number }
      : never;

export type DimensionValue<T extends MetricName> = {
  value: string; // e.g. 'car', 'bus', 'bike'
  measure: MetricMeasure<T>;
};

export type UnitOfMetricData<T extends MetricName = MetricName> = {
  metric: T;
  nUsers: number;
  dimensions: Partial<Record<GroupingField, DimensionValue<T>[]>>;
};

export type DayOfMetricData<T extends MetricName = MetricName> = UnitOfMetricData<T> & {
  date: string; // yyyy-mm-dd
};

export type MetricsData = DayOfMetricData[];
