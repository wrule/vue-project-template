import { Component, Vue, Watch } from 'vue-property-decorator';
import { VNode } from 'vue';
import XSectionBox from '../../../components/section-box';
import XFrameButton from '../../../components/frame-button';
import XDiffTable from './diff-table';
import XLineChart from '../../line-chart';
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

  private indicatorData: any = {};

  private selectedClusterList: string[] = [];
  private selectedIndicatorList: string[] = [];


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
      this.indicatorData = rsp.object;
      console.log(this.indicatorData);
      console.log('指标列表', this.autoIndicatorList);
      console.log('集群列表', this.autoClusterList);
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
      console.log(rsp.object);
    }
  }

  private get autoIndicatorList(): [string, string][] {
    return Object.entries((((this.indicatorData || {}).catalog || {}).indicatorList || {}) as any[]).map((ary) => [ary[0], ary[1]]);
  }

  private get autoClusterList(): [string, string][] {
    return Object.entries((((this.indicatorData || {}).catalog || {}).clusterMap || {}) as any[]).map((ary) => [ary[0], ary[1]]);
  }

  public mounted(): void {
    this.updateTable(this.autoIds[0], this.autoIds[1]);
    this.updateThread(
      '44815730543165440',
      '2019-01-01 12:00:00',
      '2020-01-10 12:00:00'
    );
    this.updateFilter(
      '44815730543165440',
      '2019-01-01 12:00:00',
      '2020-01-10 12:00:00'
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
          <span>指标: </span>
          <el-select
            style="width: 250px"
            placeholder="请选择指标"
            v-model={this.selectedIndicatorList}
            multiple
            filterable
            collapse-tags>
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
          <XLineChart />
        </XSectionBox>
        <XSectionBox title="详情对比">
          <XLineChart />
        </XSectionBox>
      </div>
    );
  }
}
