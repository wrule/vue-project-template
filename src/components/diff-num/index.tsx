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
   * 当前值减去旧值的差值
   */
  @Prop({ default: undefined }) private readonly diff!: number | undefined;
  /**
   * 上一个值（在设置了差值的时候此值无效）
   */
  @Prop({ default: 0 }) private readonly prevValue!: number;
  /**
   * 是否是以百分比形式显示
   */
  @Prop({ default: false }) private readonly percent!: boolean;

  /**
   * 根据diff或者是直接选取prevValue来定义比对值
   */
  private get autoPrevValueCom(): number {
    if (this.diff === undefined) {
      return this.prevValue;
    } else {
      return this.value - this.diff;
    }
  }
  private get autoValue(): string {
    return Number(this.value.toFixed(2)).toString() + (this.percent ? '%' : '');
  }
  private get autoPrevValue(): string {
    return Number(this.autoPrevValueCom.toFixed(2)).toString() + (this.percent ? '%' : '');
  }
  private get autoState(): number {
    const diff = this.value - this.autoPrevValueCom;
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
    const diff = this.value - this.autoPrevValueCom;
    if (this.autoPrevValueCom) {
      return Number(((diff / this.autoPrevValueCom) * 100).toFixed(2));
    } else {
      return 0;
    }
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
