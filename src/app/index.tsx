import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';
import ComStudent from '../student';
import Student from '@/student/student';
import panda from ':/image/panda.jpg';
import cxk from ':/image/蔡徐坤.gif';
import mp4 from ':/image/girl.mp4';

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
        <img src={panda} />
        <img src={cxk} />
        <video src={mp4}></video>
      </div>
    );
  }
}
