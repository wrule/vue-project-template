import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import XViewTabs from '../../components/view-tabs';
import XAppView from '../../components/baseline-views/app-view';
import XWorkView from '../../components/baseline-views/work-view';
import XBusinessView from '../../components/baseline-views/business-view';
import style from './index.mod.scss';

@Component
export default class ViewIndex extends Vue {
  private get autoCurTab(): string {
    return (this.$route.query.tab as string) || 'work';
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <XViewTabs />
        {this.autoCurTab === 'work' ? <XWorkView /> : ''}
        {this.autoCurTab === 'business' ? <XBusinessView /> : ''}
        {this.autoCurTab === 'app' ? <XAppView /> : ''}
      </div>
    );
  }
}
