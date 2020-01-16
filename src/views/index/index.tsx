import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';
import VSearcher from '@/components/searcher';

@Component
export default class ViewIndex extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.view}>
        <img src="panda.jpg" />
        <VSearcher />
      </div>
    );
  }
}
