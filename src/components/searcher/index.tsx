import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class VSearcher extends Vue {
  private type: string = '';
  private keyword: string = '';
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <input type="number" v-model={this.keyword} />
        <button>搜索</button>
      </div>
    );
  }
}
