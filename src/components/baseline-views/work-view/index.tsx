import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import XSectionBox from '../../../components/section-box';
import XFrameButton from '../../../components/frame-button';
import XDiffTable from './diff-table';
import style from './index.mod.scss';

@Component
export default class XWordView extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <XSectionBox title="最近两个版本差异分析">
          <template slot="right">
            <XFrameButton icon="icon icon-jiaoben-cebianlan">压测脚本差异</XFrameButton>
            <XFrameButton class={style.framebutton} icon="icon icon-jiaoben-cebianlan">依赖差异</XFrameButton>
            <XFrameButton class={style.framebutton} icon="icon icon-jiaoben-cebianlan">压测模型差异</XFrameButton>
            <XFrameButton class={style.framebutton} icon="icon icon-jiaoben-cebianlan">数据差异</XFrameButton>
            <XFrameButton class={style.framebutton}>更换版本</XFrameButton>
          </template>
          <XDiffTable />
        </XSectionBox>
        <XSectionBox title="历史趋势跟踪分析" />
        <XSectionBox title="详情对比" />
      </div>
    );
  }
}
