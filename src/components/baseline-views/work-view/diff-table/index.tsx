import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import XDiffNum from '../../../diff-num';
import style from './index.mod.scss';

@Component
export default class XDiffTable extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <el-table data={[1, 2, 3, 4]}>
          <el-table-column
            label="事务名">
          </el-table-column>
          <el-table-column
            label="平均响应时间(S)"
            sortable>
            <XDiffNum value={97.23} prevValue={100} />
          </el-table-column>
          <el-table-column
            label="99%响应时间(S)"
            sortable>
            <XDiffNum value={97.23} prevValue={100} />
          </el-table-column>
          <el-table-column
            label="95%响应时间(S)"
            sortable>
            <XDiffNum value={97.23} prevValue={100} />
          </el-table-column>
          <el-table-column
            label="成功率"
            sortable>
          </el-table-column>
          <el-table-column
            label="TPS(S)"
            sortable>
          </el-table-column>
        </el-table>
      </div>
    );
  }
}
