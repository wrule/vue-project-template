import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import TextDiff from './text-diff';
import style from './index.mod.scss';


@Component
export default class ViewTestPage extends Vue {
  private text1: string = `
.com {
  width: 100%;
}
`;
  private text2: string = `
.com {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  border: solid 1px #e0e0e0;
  border-radius: 2px;
  display: flex;
  font-size: 12px;
  color: #333;
  > div {
    height: 100%;
  }
  > .space {
    flex: 1;
    overflow: auto;
    > .inner {
      display: inline-block;
      min-width: 100%;
      > .line {
        height: 18px;
        white-space: nowrap;
        > div {
          display: inline-block;
          height: 18px;
          line-height: 18px;
        }
        > .linenum {
          width: 40px;
          padding: 0px 5px 0px 5px;
          text-align: right;
          background-color: #ddd;
          color: #999;
          font-weight: bold;
        }
        > .linetext {
          padding: 0px 2px 0px 2px;
        }
      }
    }
  }
  > .split {
    width: 1px;
    min-width: 1px;
    background-color: #333;
  }
}
`;


  // eslint-disable-next-line class-methods-use-this
  public render(): VNode {
    return (
      <div class={style.com}>
        <TextDiff
          baseText={this.text1}
          newText={this.text2}
        />
      </div>
    );
  }
}
