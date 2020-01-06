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
            label="集群">
          </el-table-column>
          <el-table-column
            label="CPU使用率"
            sortable>
            <XDiffNum value={97.23} prevValue={100} />
          </el-table-column>
          <el-table-column
            label="内存使用率"
            sortable>
            <XDiffNum value={97.23} prevValue={100} />
          </el-table-column>
          <el-table-column
            label="磁盘">
            <el-table-column
              label="读(KB/S)"
              sortable>
              <XDiffNum value={97.23} prevValue={100} />
            </el-table-column>
            <el-table-column
              label="写(KB/S)"
              sortable>
              <XDiffNum value={97.23} prevValue={100} />
            </el-table-column>
          </el-table-column>
          <el-table-column label="网络">
            <el-table-column
              label="发送(KB/S)"
              sortable>
              <XDiffNum value={97.23} prevValue={100} />
            </el-table-column>
            <el-table-column
              label="接受(KB/S)"
              sortable>
              <XDiffNum value={97.23} prevValue={100} />
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    );
  }
}
