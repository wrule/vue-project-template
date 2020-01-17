import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class XWorkLink extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>业务链路</div>
    );
  }
}
