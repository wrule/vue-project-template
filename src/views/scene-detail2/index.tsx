import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';
import * as API from '../../api';

@Component
export default class ViewSceneDetail extends Vue {

  private reports: any[] = [];
  private selection: any[] = [];

  /**
   * 场景Id
   */
  private get autoSceneId(): string {
    return this.$route.params.id || '';
  }
  /**
   * 比较按钮是否可用
   */
  private get autoCompareEnable(): boolean {
    return this.selection.length > 0;
  }

  private async updateBaseLinesBySceneIdAndTimes(
    sceneId: string,
    startTime: number,
    endTime: number,
  ): Promise<void> {
    const rsp: any = await API.queryBaselineByRangeTime({
      sceneId,
      startTime: Number(new Date()) - (1000 * 60 * 60 * 24 * 30),
      endTime: Number(new Date()),
    });
    if (rsp.success) {
      this.reports = rsp.object || [];
      console.log(this.reports);
    }
  }

  /**
   * 比较按钮点击事件
   * 直接跳转到基线比对页面
   */
  private handleCompareClick(): void {
    this.$router.push({
      name: 'view-baselines-compare',
      params: {
        session: this.selection.map((item) => item.id).join('~'),
      },
    });
  }
  /**
   * 表格选中项变化事件
   * @param selection 新的选中项集合
   */
  private handleSelectionChange(selection: any[]): void {
    this.selection = selection.slice(0);
    console.log(this.selection);
  }

  public mounted() {
    this.updateBaseLinesBySceneIdAndTimes(this.autoSceneId, 0, 0);
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <span>场景详情</span>
        <span>{this.autoSceneId}</span>
        <el-table
          data={this.reports}
          on={{
            'selection-change': this.handleSelectionChange
          }}>
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            label="名称"
            prop="title">
          </el-table-column>
        </el-table>
        <el-button disabled={!this.autoCompareEnable} onClick={this.handleCompareClick} type="primary">比对</el-button>
      </div>
    );
  }
}
