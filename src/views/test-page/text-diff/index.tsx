import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { VNode } from 'vue';
import difflib from 'jsdifflib';
import style from './index.mod.scss';

@Component
export default class TextDiff extends Vue {
  @Prop({ default: '' }) private readonly baseText!: string;
  @Prop({ default: '' }) private readonly newText!: string;
  @Prop({ default: '320px' }) private readonly height!: string;

  private get autoDiffText(): [string, string] {
    return [this.baseText.trim(), this.newText.trim()];
  }
  private get autoBaseLines(): string[] {
    return difflib.stringAsLines(this.autoDiffText[0]);
  }
  private get autoNewLines(): string[] {
    return difflib.stringAsLines(this.autoDiffText[1]);
  }
  private get autoDiffOpcodes(): [
    string,
    number,
    number,
    number,
    number,
    number
  ][] {
    const sm = new difflib.SequenceMatcher(this.autoBaseLines, this.autoNewLines);
    return (sm.get_opcodes() as any[]).map((ary) => {
      const diff1 = ary[2] - ary[1];
      const diff2 = ary[4] - ary[3];
      const length = diff1 > diff2 ? diff1 : diff2;
      return ary.concat([length]);
    });
  }
  private get autoColorsMap(): any {
    return {
      equal: '#ffffff',
      replace: '#fdfbec',
      insert: '#ecfdf0',
      delete: '#fbe9eb',
      blank: '#f8f8f8',
    };
  }

  /**
   * 修改前文本行列表（可直接用于显示）
   */
  private get autoBaseViewLines(): [number, string, string][] {
    const result: [number, string, string][] = [];
    this.autoDiffOpcodes.forEach((item) => {
      const type = item[0];
      const op = item[1];
      const ed = item[2];
      const length = item[5];
      const color = this.autoColorsMap[type];
      const diff = length - (ed - op);
      for (let i = op; i < ed; ++i) {
        result.push([i, this.autoBaseLines[i], color]);
      }
      if (diff > 0) {
        result.push(...Array(diff).fill([-1, '', this.autoColorsMap.blank]));
      }
    });
    return result;
  }
  /**
   * 修改后文本行列表（可直接用于显示）
   */
  private get autoNewViewLines(): [number, string, string][] {
    const result: [number, string, string][] = [];
    this.autoDiffOpcodes.forEach((item) => {
      const type = item[0];
      const op = item[3];
      const ed = item[4];
      const length = item[5];
      const color = this.autoColorsMap[type];
      const diff = length - (ed - op);
      for (let i = op; i < ed; ++i) {
        result.push([i, this.autoNewLines[i], color]);
      }
      if (diff > 0) {
        result.push(...Array(diff).fill([-1, '', this.autoColorsMap.blank]));
      }
    });
    return result;
  }

  @Watch('autoDiffText', { immediate: true })
  private handleAutoDiffTextChange(nv: [string, string]): void {
    // console.log(this.autoDiffOpcodes);
    // console.log(this.autoBaseViewLines);
    // console.log(this.autoNewViewLines);
  }

  /**
   * 修改前文本区域DOM
   */
  private get autoBaseSpace(): Element {
    return this.$el.querySelector('.basespace') as Element;
  }
  /**
   * 修改后文本区域DOM
   */
  private get autoNewSpace(): Element {
    return this.$el.querySelector('.newspace') as Element;
  }

  /**
   * 修改前文本区域滚动条变化事件（同步滚动）
   */
  private handleBaseSpaceScrollChange(): void {
    this.autoNewSpace.scrollTop = this.autoBaseSpace.scrollTop;
    this.autoNewSpace.scrollLeft = this.autoBaseSpace.scrollLeft;
  }
  /**
   * 修改后文本区域滚动条变化事件（同步滚动）
   */
  private handleNewSpaceScrollChange(): void {
    this.autoBaseSpace.scrollTop = this.autoNewSpace.scrollTop;
    this.autoBaseSpace.scrollLeft = this.autoNewSpace.scrollLeft;
  }

  /**
   * 组件加载监听事件
   */
  public mounted(): void {
    this.autoBaseSpace.addEventListener('scroll', this.handleBaseSpaceScrollChange);
    this.autoNewSpace.addEventListener('scroll', this.handleNewSpaceScrollChange);
  }
  /**
   * 组件卸载取消事件监听
   */
  public beforeDestroy(): void {
    this.autoBaseSpace.removeEventListener('scroll', this.handleBaseSpaceScrollChange);
    this.autoNewSpace.removeEventListener('scroll', this.handleNewSpaceScrollChange);
  }

  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com} style={{height: this.height}}>
        <div class={[style.space, 'basespace']}>
          <div class={style.inner}>
            {this.autoBaseViewLines.map((item) => <div class={style.line} style={{'background-color': item[2]}}>
              <div class={style.linenum}>{item[0] >= 0 ? item[0] + 1 : ''}</div>
              <pre class={style.linetext}>{item[1]}</pre>
            </div>)}
          </div>
        </div>
        <div class={style.split}></div>
        <div class={[style.space, 'newspace']}>
          <div class={style.inner}>
            {this.autoNewViewLines.map((item) => <div class={style.line} style={{'background-color': item[2]}}>
              <div class={style.linenum}>{item[0] >= 0 ? item[0] + 1 : ''}</div>
              <pre class={style.linetext}>{item[1]}</pre>
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}
