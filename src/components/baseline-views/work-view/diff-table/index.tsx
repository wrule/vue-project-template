import { Component, Vue, Prop } from 'vue-property-decorator';
import { VNode } from 'vue';
import XDiffNum from '../../../diff-num';
import style from './index.mod.scss';

@Component
export default class XDiffTable extends Vue {
  @Prop({ default: [] }) private readonly data!: any[];

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <el-table data={this.data}>
          <el-table-column
            prop="name"
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
            sortable
            {
              ...{
                scopedSlots: {
                  default: (props: any) => {
                    return <span>{`${Number((props.row.successPercent * 100).toFixed(2))}%`}</span>
                  },
                }
              }
            }>
            <span slot-scope="slot">{}</span>
          </el-table-column>
          <el-table-column
            label="TPS(S)"
            sortable
            {
              ...{
                scopedSlots: {
                  default: (props: any) => {
                    return <span>{props.row.successTps}</span>
                  },
                }
              }
            }>
          </el-table-column>
        </el-table>
      </div>
    );
  }
}
