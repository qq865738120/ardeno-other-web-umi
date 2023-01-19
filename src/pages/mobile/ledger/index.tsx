import { LedgerModelState } from "@/models/ledger";
import { Button, CapsuleTabs, DotLoading, ErrorBlock, Form, Input, Picker, Space, Tabs } from "antd-mobile";
import { PickerValue, PickerValueExtend } from "antd-mobile/es/components/picker-view";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import {
  AppModelState,
  connect,
  ConnectProps,
  Dispatch,
  history,
  Loading,
  UserModelState,
} from "umi";
import Histogram from "./components/histogram";
import PieChart from "./components/pieChart";
import Table from "./components/table";
import styles from "./index.less";

interface PageProps extends ConnectProps {
  app: AppModelState;
  ledger: LedgerModelState;
  loading: Loading;
}

const LedgerPage: FC<PageProps> = ({ ledger, loading, dispatch }) => {
  const [ currentTab, setCurrentTab ] = useState('1')
  const [pickerValue, setPickerValue] = useState<(string | null)[]>(
    [moment().year() + '', moment().month() + 1 + '']
  )
  const [ pickerOptions, setPickerOptions ] = useState(() => {
    const year = [{ label: '2022年', value: '2022' }]
    const month = [{ label: '1月', value: '1' }]
    while (moment().year() > Number(year[year.length - 1].value)) {
      const tempYear = Number(year[year.length - 1].value) + 1
      year.push({ label: tempYear + '年', value: `${tempYear}` })
    }
    while (moment().month() + 1 > Number(month[month.length - 1].value)) {
      const tempMonth = Number(month[month.length - 1].value) + 1
      month.push({ label: tempMonth + '月', value: `${tempMonth}` })
    }
    return [year, month]
  })

  const onSetNameClick = () => {
    (dispatch as Dispatch)({ type: "app/query" });
  };

  const onFinish = (values: any) => {
    console.log(values);
    // (dispatch as Dispatch)({
    //   type: "user/fetchPublicKey",
    //   callback: (payload: any) => {

    //   },
    // });
    // (dispatch as Dispatch)({
    //   type: "user/fetchSignUp",
    //   payload: {
    //     ...values,
    //     // password: new NodeRSA(payload).encrypt(values.password, "base64"),
    //   },
    // });
    console.log(loading);
  };

  const onTabsChange = (key: string) => {
    setCurrentTab(key);
    if (key === '1') {
      const date = moment().year(Number(pickerValue[0])).month(Number(pickerValue[1]) - 1);
      (dispatch as Dispatch)({
        type: 'ledger/fetchLedgerData',
        payload: {
          starttime: date.startOf('month').unix(),
          endtime: date.endOf('month').unix()
        }
      });
      (dispatch as Dispatch)(
        {
          type: 'ledger/fetchLedgerTypeData',
          payload: {
            starttime: date.startOf('month').unix(),
            endtime: date.endOf('month').unix(),
            type: ledger.currentCapsuleTab
          }
        }
      )
    } else if (key === '2') {
      (dispatch as Dispatch)({
        type: 'ledger/fetchThreeMonthTotalChartData'
      });
    } else if (key === '3') {
      (dispatch as Dispatch)({
        type: 'ledger/fetchYearData',
        payload: {
          starttime: moment().year(Number(pickerValue[0])).startOf('year').unix(),
          endtime: moment().year(Number(pickerValue[0])).endOf('year').unix()
        }
      });
    }
  }

  const onPickerConfirm = (val: PickerValue[], extend: PickerValueExtend) => {
    console.log('aaa', val);
    setPickerValue(val)

    const date = moment().year(Number(val[0])).month(Number(val[1]) - 1);

    if (currentTab === '1') {
      (dispatch as Dispatch)({
        type: 'ledger/fetchLedgerData',
        payload: {
          starttime: date.startOf('month').unix() + '',
          endtime: date.endOf('month').unix() + ''
        }
      });
      (dispatch as Dispatch)({
        type: 'ledger/fetchLedgerTypeData',
        payload: {
          starttime: date.startOf('month').unix(),
          endtime: date.endOf('month').unix(),
          type: ledger.currentCapsuleTab
        }
      });
    } else if (currentTab === '3') {
      (dispatch as Dispatch)({
        type: 'ledger/fetchYearData',
        payload: {
          starttime: date.startOf('year').unix(),
          endtime: date.endOf('year').unix()
        }
      });
    }
  }

  const onPickerSelect = (val: PickerValue[], extend: PickerValueExtend) => {
    const year = [{ label: '2022年', value: '2022' }]
    const month = [{ label: '1月', value: '1' }]
    while (moment().year() > Number(year[year.length - 1].value)) {
      const tempYear = Number(year[year.length - 1].value) + 1
      year.push({ label: tempYear + '年', value: `${tempYear}` })
    }
    if (moment().year() > Number(val[0])) {
      for (let index = 2; index <= 12; index++) {
        month.push({ label: index + '月', value: `${index}` })
      }
    } else {
      while (moment().month() + 1 > Number(month[month.length - 1].value)) {
        const tempMonth = Number(month[month.length - 1].value) + 1
        month.push({ label: tempMonth + '月', value: `${tempMonth}` })
      }
    }
    setPickerOptions([year, month])
  }

  const onCapsuleTabChange = (val: string) => {
    (dispatch as Dispatch)({ type: 'ledger/setCurrentCapsuleTab', payload: val })
    const date = moment().year(Number(pickerValue[0])).month(Number(pickerValue[1]) - 1);
    (dispatch as Dispatch)(
      {
        type: 'ledger/fetchLedgerTypeData',
        payload: {
          starttime: date.startOf('month').unix(),
          endtime: date.endOf('month').unix(),
          type: val
        }
      }
    )
  }

  return (
    <section className={styles["ledger-page"]}>
      {
        loading.models['ledger'] && <div className={styles["loading-box"]}>
          <DotLoading color='primary' />
        </div>
      }

      <Tabs style={{ backgroundColor: 'white' }} onChange={onTabsChange}>
        <Tabs.Tab title='一个月' key='1' />
        <Tabs.Tab title='近三个月' key='2' />
        <Tabs.Tab title='年度' key='3' />
      </Tabs>

      {
        currentTab === '1' && (
          <>
            <div className={styles["content-box"]}>
              <Picker
                columns={pickerOptions}
                value={pickerValue}
                onConfirm={onPickerConfirm}
                onSelect={onPickerSelect}
              >
                {(items, { open }) => {
                  return (
                    <Space align='center'>
                      <Button size="small" onClick={open}>选择日期</Button>
                      {items.every(item => item === null)
                        ? '未选择'
                        : items.map(item => item?.label ?? '未选择').join(' - ')}
                    </Space>
                  )
                }}
              </Picker>
            </div>

            <div className={styles["content-box"]}>
              <div className={styles["title"]}>汇总</div>
              {
                ledger.ledgerTotalChart.length === 0
                  ?
                    <ErrorBlock status='empty' />
                  :
                    <>
                      <Histogram data={ledger.ledgerTotalChart} xField='type' yField="value"></Histogram>
                      <PieChart
                        data={ledger.ledgerTotalPieChart}
                      />
                    </>
              }
            </div>

            <div className={styles["content-box"]}>
              <div className={styles["title"]}>分类</div>
              <CapsuleTabs activeKey={ledger.currentCapsuleTab} onChange={onCapsuleTabChange}>
                {ledger.typeList.map(item => <CapsuleTabs.Tab title={item} key={item} />)}
              </CapsuleTabs>
              {
                ledger.ledgerTypeData.length === 0
                  ?
                    <ErrorBlock status='empty' />
                  :
                    <>
                      {ledger.ledgerTypeChart.length > 0 && <PieChart
                        data={ledger.ledgerTypeChart}
                      />}
                      <Table
                        header={
                          [
                            { label: '日期', key: 'time', width: 60, formate: (val) => moment(val).format('M月D日') },
                            { label: '金额', key: 'costAmount', width: 60, formate: (val) => val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2), },
                            { label: '类型', key: 'costType', width: 40 },
                            { label: '状态', key: 'spStatus', width: 40, formate: (val) => val === 2 ? '已结算' : '未结算' },
                            { label: '事由', key: 'reason', width: 77 },
                          ]
                        }
                        body={ledger.ledgerTypeData}
                        loading={loading.effects['ledger/fetchLedgerTypeData']}
                      />
                    </>
              }
              
            </div>
          </>
        )
      }

      {
        currentTab === '2' && (
          <>
            <div className={styles["content-box"]}>
              <div className={styles["title"]}>汇总</div>
              {
                ledger.threeMonthTotalChart.length === 0
                  ?
                    <ErrorBlock status='empty' />
                  :
                    <>
                      <Histogram
                        data={ledger.threeMonthTotalChart}
                        xField='type'
                        yField="value"
                        isGroup
                        groupField="group"
                      />
                      <Table
                        header={
                          [
                            { label: '类型', key: 'type', width: 70 },
                            { label: '同比增长（上月）', key: 'growthRate1', width: 110 },
                            { label: '同比增长（上上月）', key: 'growthRate2', width: 120 },
                          ]
                        }
                        body={ledger.threeMonthTotalTable}
                        loading={loading.effects['ledger/fetchLedgerTypeData']}
                      />
                    </>
              }
            </div>
          </>
        )
      }

      {
        currentTab === '3' && (
          <>
            <div className={styles["content-box"]}>
              <Picker
                columns={[pickerOptions[0]]}
                value={pickerValue}
                onConfirm={onPickerConfirm}
                onSelect={onPickerSelect}
              >
                {(items, { open }) => {
                  return (
                    <Space align='center'>
                      <Button size="small" onClick={open}>选择年份</Button>
                      {items.every(item => item === null)
                        ? '未选择'
                        : items[0]?.label}
                    </Space>
                  )
                }}
              </Picker>
            </div>
            <div className={styles["content-box"]}>
              <div className={styles["title"]}>总收入</div>
              <div className={styles["desc"]} style={{ color: '#1677ff' }}>{"¥" + ledger.yearTotalIncome.toFixed(2)}</div>
            </div>
            <div className={styles["content-box"]}>
              <div className={styles["title"]}>总支出</div>
              <div className={styles["desc"]} style={{ color: '#ff6010' }}>{"¥" + ledger.yearTotalExpenses.toFixed(2)}</div>
            </div>
            <div className={styles["content-box"]}>
              <div className={styles["title"]}>文军</div>
              <div className={styles["line"]}>
                <div className={styles["line-left"]}>总收入</div>
                <div className={styles["line-right"]}>{"¥" + ledger.yearWenJunIncome.toFixed(2)}</div>
              </div>
              <div className={styles["line"]}>
                <div className={styles["line-left"]}>总支出</div>
                <div className={styles["line-right"]}>{"¥" + ledger.yearWenJunExpenses.toFixed(2)}</div>
              </div>
              <div className={styles["line"]}>
                <div className={styles["line-left"]}>贡献度</div>
                <div className={styles["line-right"]}>{(ledger.yearWenJunIncome / ledger.yearWenJunExpenses).toFixed(0)}</div>
              </div>
              <PieChart
                data={ledger.yearWenJunTypeChart}
              />
            </div>
            <div className={styles["content-box"]}>
              <div className={styles["title"]}>苑媛</div>
              <div className={styles["line"]}>
                <div className={styles["line-left"]}>总收入</div>
                <div className={styles["line-right"]}>{"¥" + ledger.yearYuanIncome.toFixed(2)}</div>
              </div>
              <div className={styles["line"]}>
                <div className={styles["line-left"]}>总支出</div>
                <div className={styles["line-right"]}>{"¥" + ledger.yearYuanExpenses.toFixed(2)}</div>
              </div>
              <div className={styles["line"]}>
                <div className={styles["line-left"]}>贡献度</div>
                <div className={styles["line-right"]}>{(ledger.yearYuanIncome / ledger.yearYuanExpenses).toFixed(0)}</div>
              </div>
              <PieChart
                data={ledger.yearYuanTypeChart}
              />
            </div>
          </>
        )
      }
    </section>
  );
};

export default connect(
  ({
    app,
    ledger,
    loading,
  }: {
    app: AppModelState;
    ledger: LedgerModelState;
    loading: Loading;
  }) => ({
    app,
    ledger,
    loading,
  }),
)(LedgerPage);
