import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import cxk from ':/image/蔡徐坤.gif';
import style from './index.mod.scss';

@Component
export default class ViewQuery extends Vue {
  private get autoId(): string {
    return this.$route.params.id || '';
  }
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <span>查询:</span>
        <span>{this.autoId}</span>
        <img src={cxk} />
      </div>
    );
  }
}
