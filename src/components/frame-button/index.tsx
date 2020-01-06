import { Component, Vue, Prop } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class XFrameButton extends Vue {
  @Prop({ default: '' }) private readonly icon!: string;
  @Prop({ default: '' }) private readonly text!: string;

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        {this.$slots.icon || (this.icon ? <i class={this.icon}></i> : '')}
        {this.$slots.default || <span>{this.text}</span>}
      </div>
    );
  }
}
