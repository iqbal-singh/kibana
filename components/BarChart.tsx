import React from "react";
import {
  Bar,
  BarChart as _BarChart,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type BarChartProps = {
  data: any[];
  xAxisKey: string;
  yAxisKey: string;
  xAxisLabel: string;
  yAxisLabel: string;
  barColor: string;
  barStroke: string;
  formatDate: (date: Date) => string;
};

const BarChart: React.FunctionComponent<BarChartProps> = ({
  data,
  xAxisKey,
  xAxisLabel,
  yAxisKey,
  yAxisLabel,
  barColor,
  barStroke,
  formatDate,
}) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={250}>
        <_BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
        >
          <XAxis
            dataKey={xAxisKey}
            tickFormatter={(value, _index) =>
              value ? formatDate(new Date(value)) : "Invalid Date"
            }
          >
            <Label value={xAxisLabel} offset={-20} position="insideBottom" />
          </XAxis>
          <YAxis interval={0}>
            <Label value={yAxisLabel} angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Bar
            dataKey={yAxisKey}
            fill={barColor}
            fillOpacity=".5"
            stroke={barStroke}
          />
        </_BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChart;
