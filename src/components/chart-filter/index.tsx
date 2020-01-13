import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class XChartFilter extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        {this.$slots.default}
      </div>
    );
  }
}
