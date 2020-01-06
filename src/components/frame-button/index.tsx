import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class XFrameButton extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <i class="icon icon-jiaoben-cebianlan"></i>
        <span>压测脚本差异</span>
      </div>
    );
  }
}
