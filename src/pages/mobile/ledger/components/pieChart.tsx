import { FC } from "react"
import { Chart, Interval, Legend, PieLabel, TextGuide } from '@antv/f2';
import Canvas from '@antv/f2-react';
import { ILedgerTotalChart, ILedgerPieChart } from "@/models/ledger";

interface HistogramProps {
  data: ILedgerPieChart[];
  xField?: string;
  yField?: string;
  valueField?: string;
  lebleField?: string;
}
const PieChart: FC<HistogramProps> = ({ data, xField = 'type', yField = 'ratio', lebleField = 'memo', valueField = 'amount' }) => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio}>
      <Chart
        data={data}
        coord={{
          type: 'polar',
          transposed: true,
          innerRadius: 0.3,
          radius: 0.6,
        }}
        scale={{}}
      >
        <Interval
          x={xField}
          y={yField}
          adjust="stack"
          color={{
            field: lebleField,
            range: [
              '#1890FF',
              '#13C2C2',
              '#2FC25B',
              '#FACC14',
              '#F04864',
              '#8543E0',
              '#3436C7',
              '#223273',
            ],
          }}
        />
        <PieLabel
          label1={(data: any) => {
            return {
              text: data[lebleField],
              fill: '#808080',
            };
          }}
          label2={(data: any) => {
            return {
              fill: '#000000',
              text: '¥' + data[valueField].toFixed(2) + '（' + data[yField] * 100 + '%）',
              fontWeight: 500,
              fontSize: 10,
            };
          }}
        />
      </Chart>
    </Canvas>
  )
}

export default PieChart
