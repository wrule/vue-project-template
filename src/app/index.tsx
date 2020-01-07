import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';
import ComStudent from '../student';
import Student from '@/student/index';

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
        <ComStudent value={this.stu} />
      </div>
    );
  }
}
