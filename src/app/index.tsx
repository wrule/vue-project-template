import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';
import ComStudent from '../student';
import Student from '../student/student';
import XSectionBox from '../components/section-box2';
import XFrameButton from '../components/frame-button';
import XViewTabs from '../components/view-tabs';
import './index.scss';

@Component
export default class App extends Vue {
  private stu: Student = new Student();

  public mounted(): void {
    this.stu.Name = '江泽民';
    this.stu.Remark = '这是之前的国家主席';
    this.stu.Sex = true;
    this.stu.Age = 99;
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <router-view></router-view>
        {/* <ComStudent value={this.stu} /> */}
        {/* <XViewTabs />
        <XSectionBox title="最近两个版本差异分析">
          <template slot="right">
            <XFrameButton icon="icon icon-jiaoben-cebianlan">压测脚本差异</XFrameButton>
            <XFrameButton class={style.framebutton} icon="icon icon-jiaoben-cebianlan">依赖差异</XFrameButton>
            <XFrameButton class={style.framebutton} icon="icon icon-jiaoben-cebianlan">压测模型差异</XFrameButton>
            <XFrameButton class={style.framebutton} icon="icon icon-jiaoben-cebianlan">数据差异</XFrameButton>
            <XFrameButton class={style.framebutton}>更换版本</XFrameButton>
          </template>
        </XSectionBox>
        <XSectionBox title="历史趋势跟踪分析" />
        <XSectionBox title="详情对比" /> */}
      </div>
    );
  }
}
