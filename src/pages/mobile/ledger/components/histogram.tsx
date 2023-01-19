import { FC } from "react"
import { Chart, Interval, Tooltip, Axis, TextGuide } from '@antv/f2';
import Canvas from '@antv/f2-react';
import { ILedgerTotalChart } from "@/models/ledger";

interface HistogramProps {
  data: ILedgerTotalChart[] | any[];
  xField: string;
  yField: string;
  isGroup?: boolean;
  groupField?: string;
}
const Histogram: FC<HistogramProps> = ({ data, xField, yField, isGroup = false, groupField = 'group' }) => {
  return (
    <Canvas padding={[0,24,0,24]} pixelRatio={window.devicePixelRatio}>
      <Chart
        data={data}
        coord={{
          transposed: true,
        }}
      >
        <Axis field={xField} />
        <Axis field={yField} />
        <Interval
          x={xField}
          y={yField}
          {
            ...(
              isGroup ? {
                color: groupField,
                adjust: {
                  type: 'dodge',
                  marginRatio: 0.05, // 设置分组间柱子的间距
                }
              } : {}
            )
          }
        />
        <Tooltip showCrosshairs crosshairsType='x' triggerOn='touchstart' triggerOff="touchend"/>
        {!isGroup && data.map((item) => {
          const { value } = item;
          return (
            <TextGuide
              key={item.type}
              records={[item]}
              content={`¥${value.toFixed(2)}`}
            />
          );
        })}
      </Chart>
    </Canvas>
  )
}

export default Histogram
