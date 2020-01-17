import { Component, Vue, Watch } from 'vue-property-decorator';
import { VNode } from 'vue';
import XSectionBox from '../../components/section-box';
import XSceneMeta from './scene-meta';
import XTabs from '../../components/tabs';
import XTestBug from './test-bug';
import XTestRecord from './test-record';
import XEnvInfo from './env-info';
import XWorkLink from './work-link';
import XRelScript from './rel-script';
import XWorkView from './baseline-views/work';
import XBusinessView from './baseline-views/business';
import XAppView from './baseline-views/app';
import style from './index.mod.scss';

/**
 * @class 场景详情页面
 */
@Component
export default class ViewSceneDetail extends Vue {

  private baselineTimeRange: Date[] = [];
  private testRecordTimeRange: Date[] = [];

  private metaTab: string = '';
  private baselineTab: string = '';

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
          <XTabs v-model={this.metaTab} tabs={[
            {name: '关联脚本', key: 'rel-script'},
            {name: '环境信息', key: 'env-info'},
            {name: '业务链路', key: 'work-link'},
          ]} />
          <div class={style.framebox}>
            {this.metaTab === 'rel-script' ? <XRelScript /> : ''}
            {this.metaTab === 'env-info' ? <XEnvInfo /> : ''}
            {this.metaTab === 'work-link' ? <XWorkLink /> : ''}
          </div>
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
          <XTabs v-model={this.baselineTab} tabs={[
            {name: '事务视角', key: 'work'},
            {name: '业务视角', key: 'business'},
            {name: '应用视角', key: 'app'},
          ]} />
          <div class={style.framebox}>
            {this.baselineTab === 'work' ? <XWorkView /> : ''}
            {this.baselineTab === 'business' ? <XBusinessView /> : ''}
            {this.baselineTab === 'app' ? <XAppView /> : ''}
          </div>
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
          <XTestRecord />
        </XSectionBox>
        <XSectionBox class={style.section} title="最近压测问题">
          <XTestBug />
        </XSectionBox>
      </div>
    );
  }
}
