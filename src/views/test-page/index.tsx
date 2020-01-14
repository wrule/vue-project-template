import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import TextDiff from './text-diff';
import style from './index.mod.scss';


@Component
export default class ViewTestPage extends Vue {
  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <TextDiff
          baseText="123"
          newText="456"
        />
      </div>
    );
  }
}
