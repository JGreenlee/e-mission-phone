import { ChartDataset, ScriptableContext } from 'chart.js';
import { LabelPosition } from 'chartjs-plugin-annotation';

export type Props = {
  records: { label: string; x: number | string; y: number | string }[];
  axisTitle: string;
  type: 'bar' | 'line';
  getColorForLabel?: (label: string) => string;
  getColorForChartEl?: (
    chart,
    currDataset: ChartDataset,
    ctx: ScriptableContext<'bar' | 'line'>,
    colorFor: 'background' | 'border',
  ) => string | CanvasGradient | null;
  borderWidth?: number;
  lineAnnotations?: { value: number; label?: string; color?: string; position?: LabelPosition }[];
  isHorizontal?: boolean;
  timeAxis?: boolean;
  stacked?: boolean;
};
const Chart = ({
  records,
  axisTitle,
  type,
  getColorForLabel,
  getColorForChartEl,
  borderWidth,
  lineAnnotations,
  isHorizontal,
  timeAxis,
  stacked,
}: Props) => {
  return null;
};
export default Chart;
