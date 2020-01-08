import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import XSectionBox from '../../../components/section-box';
import XFrameButton from '../../../components/frame-button';
import XDiffTable from './diff-table';
import style from './index.mod.scss';
import * as API from '../../../api/';

@Component
export default class XWordView extends Vue {

  private list: any[] = [];

  private get autoIds(): string[] {
    return (this.$route.params.session || '').split('~');
  }

  private async updateTable(
    id1: string,
    id2: string,
  ): Promise<void> {
    const rsp: any = await API.reportSummaryCompare({
      firstReportId: id1,
      secondReportId: id2,
    });
    if (rsp.success) {
      this.list = Object.entries(rsp.object || {}).map((ary) => ({
        name: ary[0],
        successAvgResponseTime:
          (((ary[1] || []) as any[]).find((item) => item.requestMetric === 'successAvgResponseTime') || {}).metricCurrentValue,
        successAvgResponseTimeDiff:
          (((ary[1] || []) as any[]).find((item) => item.requestMetric === 'successAvgResponseTime') || {}).metricDiffValue,
        successMinResponseTime:
          (((ary[1] || []) as any[]).find((item) => item.requestMetric === 'successMinResponseTime') || {}).metricCurrentValue,
        successMinResponseTimeDiff:
          (((ary[1] || []) as any[]).find((item) => item.requestMetric === 'successMinResponseTime') || {}).metricDiffValue,
        successMaxResponseTime:
          (((ary[1] || []) as any[]).find((item) => item.requestMetric === 'successMaxResponseTime') || {}).metricCurrentValue,
        successMaxResponseTimeDiff:
          (((ary[1] || []) as any[]).find((item) => item.requestMetric === 'successMaxResponseTime') || {}).metricDiffValue,
        successPercent:
          (((ary[1] || []) as any[]).find((item) => item.requestMetric === 'successPercent') || {}).metricCurrentValue,
        successPercentDiff:
          (((ary[1] || []) as any[]).find((item) => item.requestMetric === 'successPercent') || {}).metricDiffValue,
        successTps:
          (((ary[1] || []) as any[]).find((item) => item.requestMetric === 'successTps') || {}).metricCurrentValue,
        successTpsDiff:
          (((ary[1] || []) as any[]).find((item) => item.requestMetric === 'successTps') || {}).metricDiffValue,
      }));
      console.log(this.list);
    }
  }


  public mounted(): void {
    this.updateTable(this.autoIds[0], this.autoIds[1]);
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
        <XSectionBox title="历史趋势跟踪分析" />
        <XSectionBox title="详情对比" />
      </div>
    );
  }
}
