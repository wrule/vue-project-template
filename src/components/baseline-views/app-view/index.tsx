import { Component, Vue, Watch } from 'vue-property-decorator';
import { VNode } from 'vue';
import XSectionBox from '../../section-box2';
import XFrameButton from '../../../components/frame-button';
import XDiffTable from './diff-table';
import XLineChart from '../../line-chart';
import XChartFilter from '../../chart-filter';
import * as API from '../../../api';
import style from './index.mod.scss';

@Component
export default class XAppView extends Vue {
  private list: any[] = [];

  private mock: any = {
    '压⼒力力机:stress_2_192_168_0_101': [
      {
        "firstReportId": "421999648283033600",
        "metricCurrentValue": 134724.27,
        "metricDiffPercent": 28.02,
        "metricDiffValue": 29491.2,
        "requestMetric": "avgNetSendBytesRate",
        "secondReportId": "421999156148568064"
      },
      {
        "firstReportId": "421999648283033600",
        "metricCurrentValue": 0.0,
        "metricDiffPercent": null,
        "metricDiffValue": 0.0,
        "requestMetric": "avgDiskReadBytesRate",
        "secondReportId": "421999156148568064"
      },
      {
        "firstReportId": "421999648283033600",
        "metricCurrentValue": 3112192.0,
        "metricDiffPercent": 36.06,
        "metricDiffValue": 824849.0,
        "requestMetric": "avgNetReceiveBytesRate",
        "secondReportId": "421999156148568064"        
      },
      {
        "firstReportId": "421999648283033600",
        "metricCurrentValue": 2.3,
        "metricDiffPercent": 25.45,
        "metricDiffValue": 0.4667,
        "requestMetric": "avgDiskWriteBytesRate",
        "secondReportId": "421999156148568064"
      },
      {
        "firstReportId": "421999648283033600",
        "metricCurrentValue": 0.4264,
        "metricDiffPercent": 16.24,
        "metricDiffValue": 0.0596,
        "requestMetric": "avgUserCpuUsagePercent",
        "secondReportId": "421999156148568064"        
      },
      {
        "firstReportId": "421999648283033600",
        "metricCurrentValue": 0.224,
        "metricDiffPercent": 1.46,
        "metricDiffValue": 0.0032,
        "requestMetric": "avgMemUsagePercent",
        "secondReportId": "421999156148568064"
      }
    ],
  };

  private trendData: any = {};
  private filterData: any = {};
  private detailData: any = {};

  private selectedClusterList: string[] = [];
  private selectedIndicator: string = '';
  private selectedCluster2: string = '';
  private selectedIndicator2: string = '';
  private selectedReportList: string[] = [];

  private mock2: any = {
    "extParams": {},
    "object": {
      "421702556801040384": {
        "reportId": 421702556801040400,
        "clusterId": "28425205957263360",
        "indicatorType": "avgDiskReadBytesRate",
        "runningIndicatorList": {
          "0": [0.3263385, 0.326339, 0.326339, 0, 0, 0, 0, 0, 0],
          "14000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "15000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "16000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "17000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "18000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "19000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "20000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "21000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "22000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "23000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "24000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "25000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "26000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0],
          "27000": [0.326334, 0.326334, 0.326334, 0, 0, 0, 0, 0, 0]
        }
      },
      "421692611665854464": {
        "reportId": 421692611665854460,
        "clusterId": "28425205957263360",
        "indicatorType": "avgDiskReadBytesRate",
        "runningIndicatorList": {
          "0": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "1000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "2000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "3000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "4000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "5000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "6000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "7000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "8000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 8, 8, 0],
          "9000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "10000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "11000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "12000": [0.326303, 0.326303, 0.326303, 0, 0, 0, 0, 0, 0],
          "13000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 4, 4, 0],
          "14000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 0, 0, 0],
          "15000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 0, 0, 0],
          "16000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 0, 0, 0],
          "17000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 0, 0, 0],
          "18000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 4, 4, 0],
          "19000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 0, 0, 0],
          "20000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 0, 0, 0],
          "21000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 4, 4, 0],
          "22000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 0, 0, 0],
          "23000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 0, 0, 0],
          "24000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 0, 0, 0],
          "25000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 0, 0, 0],
          "26000": [0.3263005, 0.326301, 0.326301, 0, 0, 0, 0, 0, 0],
          "27000": [0.326301, 0.326301, 0.326301, 0, 0, 0, 24, 24, 0],
          "28000": [0.326298, 0.326298, 0.326298, 0, 0, 0, 8, 8, 0]
        }
      },
      "421702198926245888": {
        "reportId": 421702198926245900,
        "clusterId": "28425205957263360",
        "indicatorType": "avgDiskReadBytesRate",
        "runningIndicatorList": {
          "17000": [0.326323, 0.326323, 0.326323, 0, 0, 0, 0, 0, 0],
          "18000": [0.326323, 0.326323, 0.326323, 0, 0, 0, 0, 0, 0],
          "19000": [0.326323, 0.326323, 0.326323, 0, 0, 0, 0, 0, 0],
          "20000": [0.326323, 0.326323, 0.326323, 0, 0, 0, 0, 0, 0],
          "21000": [0.326323, 0.326323, 0.326323, 0, 0, 0, 0, 0, 0],
          "22000": [0.326323, 0.326323, 0.326323, 0, 0, 0, 0, 0, 0],
          "23000": [0.3263235, 0.326323, 0.326323, 0, 0, 0, 0, 0, 0],
          "24000": [0.3263235, 0.326323, 0.326323, 0, 0, 0, 0, 0, 0],
          "25000": [0.3263235, 0.326323, 0.326323, 0, 0, 0, 0, 0, 0],
          "26000": [0.3263235, 0.326323, 0.326323, 0, 0, 0, 0, 0, 0],
          "27000": [0.3263235, 0.326324, 0.326324, 0, 0, 0, 24, 24, 0]
        }
      }
    },
    "success": true
  };



  private get autoIds(): string[] {
    return (this.$route.params.session || '').split('~');
  }

  /**
   * 为了适应后端的坏习惯不得不做一些数据转换
   * @param object 数据
   * @param fieldBy 字段by
   * @param valueBy 值by
   * @param valueDiffBy diff值by
   */
  private transformation(
    object: any,
    fieldBy: string = 'requestMetric',
    valueBy: string = 'metricCurrentValue',
    valueDiffBy: string = 'metricDiffValue'): any[] {
    return Object.entries(object || {}).map((ary) => {
      const result: any = {};
      result.name = ary[0] || '';
      ((ary[1] || []) as any[]).forEach((item) => {
        const field = item[fieldBy];
        const fieldDiff = field + 'Diff';
        const value = item[valueBy];
        const valueDiff = item[valueDiffBy];
        result[field] = value;
        result[fieldDiff] = valueDiff;
      });
      return result;
    });
  }

  private async updateTable(
    id1: string,
    id2: string,
  ): Promise<void> {
    const rsp: any = await API.clusterIndicatorDataComparing({
      baseReportId: id1,
      comparedReportId: id2,
    });
    if (rsp.success) {
      this.list = Object.entries(rsp.object || {}).map((ary) => ({
        name: ary[0] || '',
        avgUserCpuUsagePercent: ((ary[1] || []) as any[]).find((item) => item.requestMetric === 'avgUserCpuUsagePercent')
      }));
      console.log(rsp.object);
    }
    this.list = this.transformation(this.mock);
    console.log(this.list);
  }

  private async updateThread(
    sceneId: string,
    startTime: string,
    endTime: string,
  ): Promise<void> {
    const rsp: any = await API.clusterIndicatorDataTrend({
      sceneId,
      startTime,
      endTime,
    });
    if (rsp.success) {
      this.trendData = rsp.object;
      console.log(this.trendData);
    }
  }

  private async updateFilter(
    sceneId: string,
    startTime: string,
    endTime: string,
  ): Promise<void> {
    const rsp: any = await API.clusterRunningDataTrendCatalog({
      sceneId,
      startTime,
      endTime,
    });
    if (rsp.success) {
      this.filterData = rsp.object || {};
      console.log(this.filterData);
    }
  }

  /**
   * 可选的指标类型列表
   */
  private get autoIndicatorList(): [string, string][] {
    return Object.entries((((this.trendData || {}).catalog || {}).indicatorList || {}) as any[]).map((ary) => [ary[0], ary[1]]);
  }
  /**
   * 可选的集群列表
   */
  private get autoClusterList(): string[][] {
    return Object.entries((((this.trendData || {}).catalog || {}).clusterMap || {}) as any[]).map((ary) => [ary[0], ary[0], ary[1]]);
  }
  /**
   * 可选的指标类型列表
   */
  private get autoIndicatorList2(): [string, string][] {
    return Object.entries((this.filterData.indicatorList || {}) as any[]).map((ary) => [ary[0], ary[1]]);
  }
  /**
   * 可选的集群列表
   */
  private get autoClusterList2(): string[][] {
    return Object.entries((this.filterData.clusterList || {}) as any[]).map((ary) => [ary[0], ary[1]]);
  }
  /**
   * 可选的报告列表
   */
  private get autoReportList(): [string, string][] {
    return ((this.filterData.reportList || []) as any[]).map((item) => ([item.description, item.reportId]));
  }
  /**
   * 趋势数据
   */
  private get autoTrendData(): any {
    return (this.trendData || {}).trendResp || {};
  }

  @Watch('autoTrendChartData')
  private handleAutoTrendChartDataChange(nv: any): void {
    console.log(nv);
  }

  /**
   * 当前过滤条件下的图表数据
   */
  private get autoTrendChartData(): any[] {
    const result: any[] = [];
    const trendData = this.autoTrendData[this.selectedIndicator] || {};
    this.selectedClusterList.forEach((cluster) => {
      const clusterData = trendData[cluster];
      if (clusterData) {
        const list = (Object.entries(clusterData) as any[][]).map((ary) => ({
          type: cluster,
          time: Number(ary[0]),
          value: Number(ary[1][0]),
          data: ary[1][1],
        }));
        list.sort((a, b) => a.time - b.time);
        result.push(...list);
      }
    });
    return result;
  }
  /**
   * 当前图表2的过滤条件
   */
  private get autoFilterParams(): any {
    return {
      indicatorName: this.selectedIndicator2,
      clusterId: this.selectedCluster2,
      reportIdList: this.selectedReportList,
    };
  }
  /**
   * 详情对比曲线数据
   */
  private get autoDetailChartData(): any[] {
    const result: any[] = [];
    Object.entries(this.detailData || {}).forEach((ary) => {
      const type = ary[0];
      const list = (Object.entries((ary[1] as any).runningIndicatorList || {}) as any[][]).map((item) => ({
        type,
        time: Number(item[0]),
        value: item[1][0],
      }));
      result.push(...list);
    });
    return result;
  }

  @Watch('autoFilterParams')
  private async handleAutoFilterParamsChange(nv: any): Promise<void> {
    if (
      nv.indicatorName &&
      nv.clusterId &&
      nv.reportIdList.length > 0
    ) {
      const rsp: any = await API.clusterRunningDataTrend(nv);
      if (rsp.success) {
        this.detailData = this.mock2.object;
        console.log(this.detailData);
      }
    }
  }

  public mounted(): void {
    this.updateTable(this.autoIds[0], this.autoIds[1]);
    this.updateThread(
      '44815730543165440',
      '2019-01-01 12:00:00',
      '2020-01-09 12:00:00'
    );
    this.updateFilter(
      '44815730543165440',
      '2019-01-01 12:00:00',
      '2020-01-09 12:00:00'
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <XSectionBox title="最近两个版本差异分析">
          <template slot="right">
            <XFrameButton icon="icon icon-jiaoben-cebianlan">压测脚本差异</XFrameButton>
            <XFrameButton class={style.framebutton} icon="icon icon-jiaoben-cebianlan">依赖差异</XFrameButton>
            <XFrameButton class={style.framebutton} icon="icon icon-jiaoben-cebianlan">压测模型差异</XFrameButton>
            <XFrameButton class={style.framebutton} icon="icon icon-jiaoben-cebianlan">数据差异</XFrameButton>
            <XFrameButton class={style.framebutton}>更换版本</XFrameButton>
          </template>
          <XDiffTable
            data={this.list}
          />
        </XSectionBox>
        <XSectionBox title="历史趋势跟踪分析">
          <XChartFilter>
            <span>指标: </span>
            <el-select
              style="width: 150px"
              placeholder="请选择指标"
              clearable
              v-model={this.selectedIndicator}>
              {this.autoIndicatorList.map((ary) => <el-option value={ary[1]} label={ary[0]}></el-option>)}
            </el-select>
            <span>集群: </span>
            <el-select
              style="width: 250px"
              placeholder="请选择集群"
              v-model={this.selectedClusterList}
              multiple
              filterable
              collapse-tags>
              {this.autoClusterList.map((ary) => <el-option value={ary[1]} label={ary[0]}></el-option>)}
            </el-select>
          </XChartFilter>
          <XLineChart
            data={this.autoTrendChartData}
          />
        </XSectionBox>
        <XSectionBox title="详情对比">
        <XChartFilter>
            <span>集群: </span>
            <el-select
              style="width: 150px"
              placeholder="请选择集群"
              clearable
              v-model={this.selectedCluster2}>
              {this.autoClusterList2.map((ary) => <el-option value={ary[1]} label={ary[0]}></el-option>)}
            </el-select>
            <span>指标: </span>
            <el-select
              style="width: 150px"
              placeholder="请选择指标"
              clearable
              v-model={this.selectedIndicator2}>
              {this.autoIndicatorList2.map((ary) => <el-option value={ary[1]} label={ary[0]}></el-option>)}
            </el-select>
            <span>版本: </span>
            <el-select
              style="width: 250px"
              placeholder="请选择报告版本"
              v-model={this.selectedReportList}
              multiple
              filterable
              collapse-tags>
              {this.autoReportList.map((ary) => <el-option value={ary[1]} label={ary[0]}></el-option>)}
            </el-select>
          </XChartFilter>
          <XLineChart
            data={this.autoDetailChartData}
          />
        </XSectionBox>
      </div>
    );
  }
}
