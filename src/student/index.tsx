import { Component, Vue, Prop } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';
import Student from './student';

@Component
export default class ComStudent extends Vue {
  @Prop() private readonly value!: Student;
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <ul class={style.com}>
        <li>
          <span>姓名：</span>
          <span>{this.value.Name}</span>
          <i class="icon iconcanshubianqian1"></i>
        </li>
        <li>
          <span>性别：</span>
          <span>{this.value.Sex ? '男' : '女'}</span>
        </li>
        <li>
          <span>年龄：</span>
          <span>{this.value.Age}</span>
        </li>
        <li>
          <span>备注：</span>
          <span>{this.value.Remark}</span>
        </li>
      </ul>
    );
  }
}
