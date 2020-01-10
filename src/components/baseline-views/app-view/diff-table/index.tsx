import { Component, Vue, Prop } from 'vue-property-decorator';
import { VNode } from 'vue';
import XDiffNum from '../../../diff-num';
import style from './index.mod.scss';

@Component
export default class XDiffTable extends Vue {
  @Prop({ default() { return[]; } }) private readonly data!: any[];

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <el-table data={this.data}>
          <el-table-column
            label="集群"
            prop="name">
          </el-table-column>
          <el-table-column
            label="CPU使用率"
            sortable
            {
              ...{
                scopedSlots: {
                  default: (props: any) => {
                    return <XDiffNum percent={true} value={props.row.avgUserCpuUsagePercent * 100} diff={props.row.avgUserCpuUsagePercentDiff * 100} />;
                  },
                }
              }
            }>
          </el-table-column>
          <el-table-column
            label="内存使用率"
            sortable
            {
              ...{
                scopedSlots: {
                  default: (props: any) => {
                    return <XDiffNum percent={true} value={props.row.avgMemUsagePercent * 100} diff={props.row.avgMemUsagePercentDiff * 100} />;
                  },
                }
              }
            }>
          </el-table-column>
          <el-table-column
            label="磁盘">
            <el-table-column
              label="读(KB/S)"
              sortable
              {
                ...{
                  scopedSlots: {
                    default: (props: any) => {
                      return <XDiffNum value={props.row.avgDiskReadBytesRate} diff={props.row.avgDiskReadBytesRateDiff} />;
                    },
                  }
                }
              }>
            </el-table-column>
            <el-table-column
              label="写(KB/S)"
              sortable
              {
                ...{
                  scopedSlots: {
                    default: (props: any) => {
                      return <XDiffNum value={props.row.avgDiskWriteBytesRate} diff={props.row.avgDiskWriteBytesRateDiff} />;
                    },
                  }
                }
              }>
            </el-table-column>
          </el-table-column>
          <el-table-column label="网络">
            <el-table-column
              label="发送(KB/S)"
              sortable
              {
                ...{
                  scopedSlots: {
                    default: (props: any) => {
                      return <XDiffNum value={props.row.avgNetSendBytesRate} diff={props.row.avgNetSendBytesRateDiff} />;
                    },
                  }
                }
              }>
            </el-table-column>
            <el-table-column
              label="接受(KB/S)"
              sortable
              {
                ...{
                  scopedSlots: {
                    default: (props: any) => {
                      return <XDiffNum value={props.row.avgNetReceiveBytesRate} diff={props.row.avgNetReceiveBytesRateDiff} />;
                    },
                  }
                }
              }>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    );
  }
}
