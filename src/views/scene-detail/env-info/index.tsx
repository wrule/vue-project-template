import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class XEnvInfo extends Vue {
  private curapp: string = '';

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <div class={style.header}>
          <div><span>服务器配置</span></div>
          <div>
            <span class={style.selectlabel}>选择应用</span>
            <el-select
              placeholder="请选择应用"
              v-model={this.curapp}
              clearable>
              <el-option label="应用1" value="1"></el-option>
            </el-select>
          </div>
        </div>
        <div class={style.content}>
          <el-table
            header-cell-style={{'background-color': '#f7f7f7', color: '#333', padding: '0px'}}>
            <el-table-column
              sortable
              label="集群名">
            </el-table-column>
            <el-table-column
              sortable
              label="资源类型">
            </el-table-column>
            <el-table-column
              sortable
              label="操作系统">
            </el-table-column>
            <el-table-column
              sortable
              label="版本号">
            </el-table-column>
            <el-table-column
              sortable
              label="IP">
            </el-table-column>
            <el-table-column
              sortable
              label="CPU">
            </el-table-column>
            <el-table-column
              sortable
              label="内存">
            </el-table-column>
            <el-table-column
              sortable
              label="磁盘">
            </el-table-column>
            <el-table-column
              sortable
              label="网络">
            </el-table-column>
          </el-table>
        </div>
      </div>
    );
  }
}
