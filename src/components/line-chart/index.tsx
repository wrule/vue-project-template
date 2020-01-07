import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import G2 from '@antv/g2';
import style from './index.mod.scss';

const LINE_COLORS = ['#FF9E6F', '#46D8D3', '#2BAAFF', '#2B7CFF', '#F55E5E'];

@Component
export default class XLineChart extends Vue {
  private chart!: G2.Chart;

  private get autoMockData(): any[] {
    const now = Number(new Date());
    const times = Array(50).fill(0).map((num, index) => now + index * 1000);
    const result: any[] = [];
    Array(5).fill(0).map((num, index) => {
      result.push(...(times.map((time) => ({
        type: `类型${index + 1}`,
        time,
        value: Math.random() * 100 + 20,
      }))));
    });
    return result;
  }

  private initChart(): void {
    this.chart = new G2.Chart({
      container: this.$el as any,
      height: 270,
      forceFit: true,
      padding: 'auto',
    });
    this.chart.source(this.autoMockData);
    this.chart.scale({
      time: {
        type: 'time',
        tickCount: 8,
      },
      value: {
        type: 'linear',
        tickCount: 5,
        min: 0,
        minLimit: 0,
      },
    });
    this.chart.axis('time', {
      label: {
        textStyle: {
          fontSize: 11,
        },
      },
    });
    this.chart.axis('value', {
      label: {
        textStyle: {
          fontSize: 11,
        },
      },
    });
    // this.chart.tooltip(false);
    this.chart.legend(false);
    this.chart
      .area()
      .position('time*value')
      .color('type', LINE_COLORS)
      .opacity(0.1)
      .shape('smooth')
      .size(2);
    this.chart
      .line()
      .position('time*value')
      .color('type', LINE_COLORS)
      .shape('smooth')
      .size(2);
    this.chart.render();
  }

  public mounted(): void {
    this.initChart();
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
      </div>
    );
  }
}
