import { FC } from "react"
import { Chart, Interval, Tooltip, Axis, TextGuide } from '@antv/f2';
import Canvas from '@antv/f2-react';
import { ILedgerTotalChart } from "@/models/ledger";
import styles from './table.less'
import { DotLoading } from "antd-mobile";

interface TableProps {
  header: { label: string, key: string, width: number, formate?: (value: any) => any }[];
  body: any[];
  loading?: boolean;
}
const Table: FC<TableProps> = ({ header, body, loading = false }) => {
  return (
    <section className={styles["table-component"]}>
      {loading && <div className={styles["loading"]}>
        <DotLoading color='primary' />
      </div>}
      <div className={loading ? styles["table-loading"] : ''}>
        <div className={styles["header"]}>
          <div className={styles["row"]}>
            {
              header.map(item =>
                <div key={item.key} className={styles["cell"]} style={{ width: item.width + 'px' }}>
                  {item.label}
                </div>
              )
            }
          </div>
        </div>
        <div className={styles["body"]}>
          {
            body.map((row: any) =>
              <div key={JSON.stringify(row)} className={styles["row"]}>
                {
                  header.map(item =>
                    <div key={item.key} className={styles["cell"]} style={{ width: item.width + 'px' }}>
                      {item.formate ? item.formate(row[item.key]) : row[item.key]}
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default Table
