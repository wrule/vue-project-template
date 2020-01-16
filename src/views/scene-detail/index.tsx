import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import XSectionBox from '../../components/section-box';
import XSceneMeta from './scene-meta';
import style from './index.mod.scss';

/**
 * @class 场景详情页面
 */
@Component
export default class ViewSceneDetail extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.page}>
        <XSectionBox class={style.section} title="未命名场景">
          <XSceneMeta />
        </XSectionBox>
        <XSectionBox class={style.section} title="基线跟踪" />
        <XSectionBox class={style.section} title="压测记录" />
        <XSectionBox class={style.section} title="最近压测问题" />
      </div>
    );
  }
}
