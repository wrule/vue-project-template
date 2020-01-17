import { Component, Vue, Watch } from 'vue-property-decorator';
import { VNode } from 'vue';
import XSectionBox from '../../components/section-box';
import XSceneMeta from './scene-meta';
import XTabs from '../../components/tabs';
import style from './index.mod.scss';

/**
 * @class 场景详情页面
 */
@Component
export default class ViewSceneDetail extends Vue {

  private baselineTimeRange: Date[] = [];
  private testRecordTimeRange: Date[] = [];

  @Watch('baselineTimeRange')
  private handleBaselineTimeRange(nv: Date[]): void {
    console.log(nv[0].toLocaleString());
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.page}>
        <XSectionBox class={style.section} title="未命名场景">
          <XSceneMeta />
          <XTabs tabs={[
            {name: '关联脚本', key: 'script'},
            {name: '环境信息', key: 'env'},
            {name: '业务链路', key: 'link'},
          ]} />
          <div class={style.framebox}>你好</div>
        </XSectionBox>
        <XSectionBox class={style.section} title="基线跟踪">
          <el-date-picker
            slot="right"
            v-model={this.baselineTimeRange}
            type="datetimerange"
            align="right"
            clearable
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            default-time={['00:00:00', '23:59:59']}>
          </el-date-picker>
          <XTabs tabs={[
            {name: '压力视角', key: 'script'},
            {name: '业务视角', key: 'env'},
            {name: '应用视角', key: 'link'},
          ]} />
          <div class={style.framebox}>你好</div>
        </XSectionBox>
        <XSectionBox class={style.section} title="压测记录">
          <el-date-picker
            slot="right"
            v-model={this.testRecordTimeRange}
            type="datetimerange"
            align="right"
            clearable
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            default-time={['00:00:00', '23:59:59']}>
          </el-date-picker>
        </XSectionBox>
        <XSectionBox class={style.section} title="最近压测问题" />
      </div>
    );
  }
}
