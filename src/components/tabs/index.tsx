import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class XTabs extends Vue {
  @Prop({ default: '' }) private readonly value!: string;
  private curkey: string = '';
  @Watch('value', { immediate: true })
  private handleValueChange(nv: string): void {
    this.curkey = nv;
  }
  @Prop({ default() { return []; } }) private readonly tabs!: any[];
  @Prop({ default: '' }) private readonly align!: string;

  /**
   * 组件自动样式
   */
  private get autoStyle(): any {
    const result: any = {};
    if (this.align === 'center') {
      result['justify-content'] = 'center';
    } else if (this.align === 'right') {
      result['justify-content'] = 'flex-end';
    } else {
      result['justify-content'] = 'flex-start';
    }
    return result;
  }

  @Emit('input')
  private handleClick(tab: any): string {
    this.curkey = tab.key;
    return this.curkey;
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com} style={this.autoStyle}>
        <ul>
          {this.tabs.map((tab) => <li
            class={tab.key === this.curkey ? [style.active] : []}
            onClick={() => { this.handleClick(tab) }}>
            {tab.name}
          </li>)}
        </ul>
      </div>
    );
  }
}
