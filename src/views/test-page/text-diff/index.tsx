import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { VNode } from 'vue';
import difflib from 'jsdifflib';
import 'jsdifflib/index.css';
import style from './index.mod.scss';
import './index.scss';

@Component
export default class TextDiff extends Vue {
  @Prop({ default: '' }) private readonly baseText!: string;
  @Prop({ default: '' }) private readonly newText!: string;

  private get autoDiffText(): [string, string] {
    return [this.baseText, this.newText];
  }

  @Watch('autoDiffText', { immediate: true })
  private handleAutoDiffTextChange(nv: [string, string]): void {
    const table = this.buildView(nv[0], nv[1]);
    this.$nextTick(() => {
      this.$el.appendChild(table);
    });
  }

  private buildView(baseText: string, newText: string): any {
    return (difflib as any).buildView({
        baseText,
        newText,
        baseTextName: "修改前",
        newTextName: "修改后",
        contextSize: 10,
        inline: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}></div>
    );
  }
}
