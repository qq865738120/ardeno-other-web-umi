import moment from 'moment';
import { queryLegerType, queryLegerData } from "@/services/ledger";
import type { Effect, ImmerReducer, Subscription } from "umi";

export interface Ledger {
  /**
   * 审批单号，使用企业微信生成的id编号
   */
  id: string;

  /**
   * 审批状态，1-审批中；2-已通过；3-已驳回；4-已撤销；6-通过后撤销；7-已删除；10-已支付
   */
  spStatus: number;

  /**
  * 审批类型
  */
  type: string;

  /**
  * 审批原由
  */
  reason: string;

  /**
  * 费用类型
  */
  costType: string;

  /**
  * 发生时间
  */
  time: string;

  /**
  * 费用金额
  */
  costAmount: number;

  /**
  * 费用说明
  */
  costDescription: string;

  /**
  * 附件
  */
  attachment: string;
}

export interface ILedgerTotalChart { type: string; value: number }

export interface IThreeMonthTotalChart extends Ledger {
  type: string;
  value: number;
  group: string;
}

export interface IThreeMonthTotalTable {
  type: string;
  growthRate1: string;
  growthRate2: string;
}

export interface ILedgerPieChart {
  amount: number;
  ratio: number;
  memo: string;
  type: string;
}

export interface LedgerModelState {
  typeList: string[];
  ledgerData: Ledger[];
  ledgerTypeData: Ledger[];
  ledgerTypeChart: ILedgerPieChart[];
  ledgerTotalChart: ILedgerTotalChart[]
  ledgerTotalPieChart: ILedgerPieChart[];
  currentCapsuleTab: string

  threeMonthTotalChart: IThreeMonthTotalChart[];
  threeMonthTotalTable: IThreeMonthTotalTable[];

  yearData: Ledger[];
  yearTotalIncome: number;
  yearTotalExpenses: number;
  yearWenJunIncome: number,
  yearWenJunExpenses: number,
  yearYuanIncome: number,
  yearYuanExpenses: number,
  yearWenJunTypeChart: ILedgerPieChart[]
  yearYuanTypeChart: ILedgerPieChart[]
}

export interface LedgerModelType {
  namespace: "ledger";
  state: LedgerModelState;
  effects: {
    fetchLedgerType: Effect;
    fetchLedgerData: Effect;
    fetchLedgerTypeData: Effect;
    fetchThreeMonthTotalChartData: Effect;
    fetchYearData: Effect;
  };
  reducers: {
    // save: Reducer<LedgerModelState>;
    // 启用 immer 之后
    setLegerType: ImmerReducer<LedgerModelState>;
    setLegerData: ImmerReducer<LedgerModelState>;
    setLegerTypeData: ImmerReducer<LedgerModelState>;
    setLedgerTypeChart: ImmerReducer<LedgerModelState>;
    setLegerTotalChart: ImmerReducer<LedgerModelState>;
    setLedgerTotalPieChart: ImmerReducer<LedgerModelState>;
    setCurrentCapsuleTab: ImmerReducer<LedgerModelState>;

    setThreeMonthTotalChart: ImmerReducer<LedgerModelState>;
    setThreeMonthTotalTable: ImmerReducer<LedgerModelState>;

    setYearData: ImmerReducer<LedgerModelState>;
    setYearTotalIncome: ImmerReducer<LedgerModelState>;
    setYearTotalExpenses: ImmerReducer<LedgerModelState>;
    setYearWenJunIncome: ImmerReducer<LedgerModelState>;
    setYearWenJunExpenses: ImmerReducer<LedgerModelState>;
    setYearYuanIncome: ImmerReducer<LedgerModelState>;
    setYearYuanExpenses: ImmerReducer<LedgerModelState>;
    setYearWenJunTypeChart: ImmerReducer<LedgerModelState>;
    setYearYuanTypeChart: ImmerReducer<LedgerModelState>;
  };
  subscriptions: { setup?: Subscription };
}

const LedgerModel: LedgerModelType = {
  namespace: "ledger",
  state: {
    typeList: [],
    ledgerData: [],
    ledgerTypeData: [],
    ledgerTypeChart: [],
    ledgerTotalChart: [],
    ledgerTotalPieChart: [],
    currentCapsuleTab: '',

    threeMonthTotalChart: [],
    threeMonthTotalTable: [],

    yearData: [],
    yearTotalIncome: 0,
    yearTotalExpenses: 0,
    yearWenJunIncome: 0,
    yearWenJunExpenses: 0,
    yearYuanIncome: 0,
    yearYuanExpenses: 0,
    yearWenJunTypeChart: [],
    yearYuanTypeChart: [],
  },
  effects: {
    *fetchLedgerType(action, effects): any {
      const res = yield effects.call(queryLegerType);
      yield effects.put({ type: 'fetchLedgerTypeData', payload: {
        starttime: moment().startOf('month').unix(),
        endtime: moment().unix(),
        type: res.data[0]
      }})
      yield effects.put({ type: "setLegerType", payload: res.data });
      yield effects.put({ type: "setCurrentCapsuleTab", payload: res.data[0] });
    },
    *fetchLedgerData({ payload }, effects): any {
      const res = yield effects.call(queryLegerData, payload);
      yield effects.put({ type: "setLegerData", payload: res.data });
      const ledgerTotalChart: ILedgerTotalChart[] = [];
      const ledgerPieChart: ILedgerPieChart[] = [];
      (res.data || []).filter((item: Ledger) => item.spStatus === 2).map((item: Ledger) => {
        const index = ledgerTotalChart.findIndex(it => it.type === item.type);
        if (index > -1) {
          ledgerTotalChart[index].value += item.costAmount
        } else {
          ledgerTotalChart.push({ type: item.type, value: item.costAmount })
        }
      })
      let count = 0
      ledgerTotalChart.map(item => {
        count += Math.abs(item.value)
      })
      ledgerTotalChart.map(item => {
        ledgerPieChart.push(
          {
            amount: item.value,
            memo: item.type,
            ratio: Number((Math.abs(item.value) / count).toFixed(2)),
            type: '1'
          }
        )
      })
      yield effects.put({ type: "setLegerTotalChart", payload: ledgerTotalChart });
      yield effects.put({ type: "setLedgerTotalPieChart", payload: ledgerPieChart });
    },
    *fetchLedgerTypeData({ payload }, effects): any {
      const res = yield effects.call(queryLegerData, payload);
      yield effects.put({ type: "setLegerTypeData", payload: res.data });
      const typeChart: ILedgerPieChart[] = []
      res.data.filter((item: Ledger) => item.spStatus === 2).map((item: Ledger) => {
        const index = typeChart.findIndex(it => it.memo === item.costType);
        if (index > -1) {
          typeChart[index].amount += item.costAmount
        } else {
          typeChart.push({ amount: item.costAmount, ratio: 0, memo: item.costType, type: '1' })
        }
      })
      let count = 0
      typeChart.map(item => {
        count += Math.abs(item.amount)
      })
      typeChart.map(item => {
        item.ratio = Number((Math.abs(item.amount) / count).toFixed(2))
      })
      yield effects.put({ type: 'setLedgerTypeChart', payload: typeChart })
    },
    *fetchThreeMonthTotalChartData({ payload }, effects): any {
      const res = yield effects.call(queryLegerData, {
        starttime: moment().subtract(2, 'month').startOf('month').unix(),
        endtime: moment().endOf('month').unix()
      });
      const chartData: IThreeMonthTotalChart[] = [];
      res.data.filter((item: Ledger) => item.spStatus === 2).map((item: Ledger) => {
        chartData.push({ ...item, type: item.type, value: item.costAmount, group: moment(item.time).format('YYYY年M月') })
      })
      yield effects.put({ type: 'setThreeMonthTotalChart', payload: chartData })

      const tableData: IThreeMonthTotalTable[] = []
      const monthTypeData: { type: string, value: number }[][] = [[],[],[]]
      chartData.map(item => {
        let monthIndex = 0
        if (item.group === moment().format('YYYY年M月')) {
          monthIndex = 0
        } else if (item.group === moment().subtract(1, 'month').format('YYYY年M月')) {
          monthIndex = 1
        } else {
          monthIndex = 2
        }
        const index = monthTypeData[monthIndex].findIndex(it => it.type === item.type);
        if (index > -1) {
          monthTypeData[index][monthIndex].value += item.costAmount;
        } else {
          monthTypeData[monthIndex].push({ type: item.type, value: item.costAmount })
        }
      })
      monthTypeData[0].map((item) => {
        const month2 = monthTypeData[1].filter(it => it.type === item.type)[0];
        const month3 = monthTypeData[2].filter(it => it.type === item.type)[0];
        tableData.push({
          type: item.type,
          growthRate1: month2 ? ((Math.abs(item.value) - Math.abs(month2.value)) / Math.abs(month2.value) * 100).toFixed(0) + '%' : '-',
          growthRate2: month3 ? ((Math.abs(item.value) - Math.abs(month3.value)) / Math.abs(month3.value) * 100).toFixed(0) + '%' : '-',
        })
      })
      yield effects.put({ type: 'setThreeMonthTotalTable', payload: tableData })
    },

    *fetchYearData({ payload }, effects): any {
      const res = yield effects.call(queryLegerData, payload);
      yield effects.put({ type: 'setYearData', payload: res.data });

      let totalIncome = 0;
      (res.data as Ledger[]).filter(item => item.type === '收入' && item.spStatus === 2).map(item => {
        totalIncome += item.costAmount;
      })
      yield effects.put({ type: 'setYearTotalIncome', payload: Math.abs(totalIncome) });

      let totalExpenses = 0;
      (res.data as Ledger[]).filter(item => !['收入', '投资'].includes(item.type) && item.spStatus === 2).map(item => {
        totalExpenses += item.costAmount;
      })
      yield effects.put({ type: 'setYearTotalExpenses', payload: Math.abs(totalExpenses) });

      let wenjunTotalIncome = 0;
      (res.data as Ledger[]).filter(item => item.type === '收入' && item.costType === '文军收入' && item.spStatus === 2).map(item => {
        wenjunTotalIncome += item.costAmount;
      })
      yield effects.put({ type: 'setYearWenJunIncome', payload: Math.abs(wenjunTotalIncome) });
      let wenjunTotalExpenses = 0;
      (res.data as Ledger[]).filter(item => item.type === '文军开支' && item.spStatus === 2).map(item => {
        wenjunTotalExpenses += item.costAmount;
      })
      yield effects.put({ type: 'setYearWenJunExpenses', payload: Math.abs(wenjunTotalExpenses) });

      let yuanTotalIncome = 0;
      (res.data as Ledger[]).filter(item => item.type === '收入' && item.costType === '苑媛收入' && item.spStatus === 2).map(item => {
        yuanTotalIncome += item.costAmount;
      })
      yield effects.put({ type: 'setYearYuanIncome', payload: Math.abs(yuanTotalIncome) });
      let yuanTotalExpenses = 0;
      (res.data as Ledger[]).filter(item => item.type === '苑媛开支' && item.spStatus === 2).map(item => {
        yuanTotalExpenses += item.costAmount;
      })
      yield effects.put({ type: 'setYearYuanExpenses', payload: Math.abs(yuanTotalExpenses) });

      const wenjunTypeChart: ILedgerPieChart[] = []
      res.data.filter((item: Ledger) => item.type === '文军开支' && item.spStatus === 2).map((item: Ledger) => {
        const index = wenjunTypeChart.findIndex(it => it.memo === item.costType);
        if (index > -1) {
          wenjunTypeChart[index].amount += item.costAmount
        } else {
          wenjunTypeChart.push({ amount: item.costAmount, ratio: 0, memo: item.costType, type: '1' })
        }
      })
      let wenjunCount = 0
      wenjunTypeChart.map(item => {
        wenjunCount += Math.abs(item.amount)
      })
      wenjunTypeChart.map(item => {
        item.ratio = Number((Math.abs(item.amount) / wenjunCount).toFixed(2))
      })
      yield effects.put({ type: 'setYearWenJunTypeChart', payload: wenjunTypeChart })

      const yuanTypeChart: ILedgerPieChart[] = []
      res.data.filter((item: Ledger) => item.type === '苑媛开支' && item.spStatus === 2).map((item: Ledger) => {
        const index = yuanTypeChart.findIndex(it => it.memo === item.costType);
        if (index > -1) {
          yuanTypeChart[index].amount += item.costAmount
        } else {
          yuanTypeChart.push({ amount: item.costAmount, ratio: 0, memo: item.costType, type: '1' })
        }
      })
      let yuanCount = 0
      yuanTypeChart.map(item => {
        yuanCount += Math.abs(item.amount)
      })
      yuanTypeChart.map(item => {
        item.ratio = Number((Math.abs(item.amount) / yuanCount).toFixed(2))
      })
      yield effects.put({ type: 'setYearYuanTypeChart', payload: yuanTypeChart })
    }
    // *fetchSignUp({ payload }, { call, put, take, select }) {
    //   yield put({ type: "fetchPublicKey" });
    //   yield take("fetchPublicKey/@@end");
    //   // eslint-disable-next-line @typescript-eslint/no-shadow
    //   const publicKey = yield select((state: any) => {
    //     console.log('state', state);

    //     return state.Ledger.publicKey
    //   });

    //   const res = yield call(signUp, {
    //     ...payload,
    //     password: new NodeRSA(publicKey).encrypt(payload.password, "base64"),
    //   });
    //   yield put({ type: "setLedgerInfo", payload: res.data });
    // },
    // *fetchPublicKey(action, effects) {
    //   const res = yield effects.call(publicKey);
    //   yield effects.put({ type: "setPublicKey", payload: res.data });
    // },
  },
  reducers: {
    setLegerType(state, action) {
      return {
        ...state,
        typeList: action.payload,
      };
    },
    setLegerData(state, action) {
      return {
        ...state,
        ledgerData: action.payload,
      };
    },
    setLegerTypeData(state, action) {
      return {
        ...state,
        ledgerTypeData: action.payload,
      };
    },
    setLedgerTypeChart(state, action) {
      return {
        ...state,
        ledgerTypeChart: action.payload
      }
    },
    setLegerTotalChart(state, action) {
      return {
        ...state,
        ledgerTotalChart: action.payload
      }
    },
    setLedgerTotalPieChart(state, action) {
      return {
        ...state,
        ledgerTotalPieChart: action.payload
      }
    },
    setCurrentCapsuleTab(state, action) {
      return {
        ...state,
        currentCapsuleTab: action.payload
      }
    },
    setThreeMonthTotalChart(state, action) {
      return {
        ...state,
        threeMonthTotalChart: action.payload
      }
    },
    setThreeMonthTotalTable(state, action) {
      return {
        ...state,
        threeMonthTotalTable: action.payload
      }
    },

    setYearData(state, action) {
      return {
        ...state,
        yearData: action.payload
      }
    },
    setYearTotalIncome(state, action) {
      return {
        ...state,
        yearTotalIncome: action.payload
      }
    },
    setYearTotalExpenses(state, action) {
      return {
        ...state,
        yearTotalExpenses: action.payload
      }
    },
    setYearWenJunIncome(state, action) {
      return {
        ...state,
        yearWenJunIncome: action.payload
      }
    },
    setYearWenJunExpenses(state, action) {
      return {
        ...state,
        yearWenJunExpenses: action.payload
      }
    },
    setYearYuanIncome(state, action) {
      return {
        ...state,
        yearYuanIncome: action.payload
      }
    },
    setYearYuanExpenses(state, action) {
      return {
        ...state,
        yearYuanExpenses: action.payload
      }
    },
    setYearWenJunTypeChart(state, action) {
      return {
        ...state,
        yearWenJunTypeChart: action.payload
      }
    },
    setYearYuanTypeChart(state, action) {
      return {
        ...state,
        yearYuanTypeChart: action.payload
      }
    },
  },
  subscriptions: {
    // setup(api) {
    //   api.dispatch()
    // }
    setup({ dispatch, history }) {
      return history.listen(async ({ pathname }) => {
        if (pathname === '/ledger') {
          dispatch({
            type: 'fetchLedgerType',
          });
          dispatch({
            type: 'fetchLedgerData',
            payload: {
              starttime: moment().startOf('month').unix(),
              endtime: moment().unix()
            }
          });
        }
      });
    },
  },
};

export default LedgerModel;
