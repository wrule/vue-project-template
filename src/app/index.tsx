import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class App extends Vue {

  public mounted(): void {
    console.log(style);
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>你好世界!!</div>
    );
  }
}
