import { Component, Vue, Prop } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

/**
 * @class 段落盒子
 */
@Component
export default class XSectionBox extends Vue {
  @Prop({ default: '' }) private readonly title!: string;
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <div class={style.header}>
          <div class={style.title}>
            {this.$slots.title || <span class={style.titlespan}>{this.title}</span>}
          </div>
          <div class={style.middle}>
            {this.$slots.middle}
          </div>
          <div class={style.right}>
            {this.$slots.right}
          </div>
        </div>
        <div class={style.wrapper}>
          {this.$slots.default}
        </div>
      </div>
    );
  }
}
