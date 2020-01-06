import { Component, Vue, Watch } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class XViewTabs extends Vue {

  private curTab: string = '';
  
  @Watch('$route.query.tab', { immediate: true })
  private handleRouteTabChange(nv: string): void {
    this.curTab = nv || 'work';
  }

  private handleTabClick(cmd: string): void {
    if (cmd !== this.curTab) {
      this.curTab = cmd;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <div class={style.inner}>
          <div onClick={() => this.handleTabClick('work')} class={this.curTab === 'work' ? style.active : ''}>
            <span>事务视角</span>
          </div>
          <div onClick={() => this.handleTabClick('business')} class={this.curTab === 'business' ? style.active : ''}>
            <span>业务视角</span>
          </div>
          <div onClick={() => this.handleTabClick('app')} class={this.curTab === 'app' ? style.active : ''}>
            <span>应用视角</span>
          </div>
        </div>
      </div>
    );
  }
}
