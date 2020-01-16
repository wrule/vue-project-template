import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class ViewGroup extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.view}></div>
    );
  }
}
