import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class XSceneMeta extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <ul class={style.com}>
        <li>
          <div class={style.title}><span>创建时间</span></div>
          <div><span>2019-02-01 12:12:13</span></div>
        </li>
        <li>
          <div class={style.title}><span>创建人</span></div>
          <div><span>张三</span></div>
        </li>
        <li>
          <div class={style.title}><span>最近执行</span></div>
          <div><span>-</span></div>
        </li>
        <li>
          <div class={style.title}><span>涉及业务</span></div>
        </li>
      </ul>
    );
  }
}
