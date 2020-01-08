import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';
import * as API from '../../api/';

@Component
export default class ViewSceneDetail extends Vue {

  /**
   * 场景Id
   */
  private get autoSceneId(): string {
    return this.$route.params.id || '';
  }

  public async mounted(): Promise<void> {
    const rsp = await API.queryBaselineByRangeTime({
      sceneId: this.autoSceneId,
      startTime: 0,
      endTime: 0,
    });
    console.log(rsp);
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <span>场景详情</span>
        <span>{this.autoSceneId}</span>
      </div>
    );
  }
}
