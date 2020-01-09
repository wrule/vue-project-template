import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class ViewIndex extends Vue {
  public mounted(): void {
    console.log('主页加载');
  }
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <div>
          <span>主页</span>
        </div>
        <div>
          <router-link to={{ name: 'view-query', params: { id: '123' } }}>查询</router-link>
          <router-link to={{ name: 'view-check', params: { id: '456' } }}>检查</router-link>
        </div>
      </div>
    );
  }
}
