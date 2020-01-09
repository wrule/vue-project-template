import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class ViewCheck extends Vue {
  private get autoId(): string {
    return this.$route.params.id || '';
  }
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <span>检查:</span>
        <span>{this.autoId}</span>
      </div>
    );
  }
}
