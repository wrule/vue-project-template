import { Component, Vue, Prop } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class XSectionBox extends Vue {
  @Prop({ default: true }) private readonly mark!: boolean;
  @Prop({ default: '#2BAAFF' }) private readonly markColor!: string;
  @Prop({ default: '' }) private readonly title!: string;

  private get autoMarkStyle(): any {
    const result: any = {};
    result['background-color'] = this.markColor;
    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <div class={style.header}>
          <div class={style.left}>
            {this.mark ? <div class={style.mark} style={this.autoMarkStyle}></div> : ''}
            <span class={style.title}>{this.title}</span>
          </div>
          <div class={style.right}>
            {this.$slots.right}
          </div>
        </div>
        <div class={style.content}>
          {this.$slots.default}
        </div>
      </div>
    );
  }
}
