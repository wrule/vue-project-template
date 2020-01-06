import { Component, Vue, Prop } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class XDiffNum extends Vue {
  /**
   * 当前值
   */
  @Prop({ default: 0 }) private readonly value!: number;
  /**
   * 上一个值
   */
  @Prop({ default: 0 }) private readonly prevValue!: number;


  private get autoValue(): number {
    return Number(this.value.toFixed(2));
  }
  private get autoPrevValue(): number {
    return Number(this.prevValue.toFixed(2));
  }
  private get autoState(): number {
    const diff = this.value - this.prevValue;
    if (diff > 0) {
      return 2;
    } else if (diff < 0) {
      return 1;
    } else {
      return 0;
    }
  }
  private get autoStateStyle(): any {
    const colors = ['#666666', '#17C895', '#F55E5E'];
    const result: any = {};
    result['color'] = colors[this.autoState];
    return result;
  }
  private get autoStateIcon(): string {
    const icons = ['el-icon-minus', 'el-icon-bottom', 'el-icon-top'];
    return icons[this.autoState];
  }
  private get autoPercentage(): number {
    const diff = this.value - this.prevValue;
    return Number(((diff / this.prevValue) * 100).toFixed(2));
  }
  private get autoSummary(): string {
    if (this.autoState === 0) {
      return '持平';
    } else if (this.autoState === 1) {
      return `下降了 ${Math.abs(this.autoPercentage)}%`;
    } else {
      return `上涨了 ${Math.abs(this.autoPercentage)}%`;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div title={this.autoSummary} class={style.com}>
        <span>{this.autoValue}</span>
        {this.autoState || true ? <i class={this.autoStateIcon} style={this.autoStateStyle}></i> : ''}
        <div style={this.autoStateStyle}>
          <span>{this.autoPrevValue}</span>
          <span>
            <span>{`${this.autoPercentage}%`}</span>
          </span>
        </div>
      </div>
    );
  }
}
