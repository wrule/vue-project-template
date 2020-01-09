import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.mod.scss';

@Component
export default class App extends Vue {
  public render(): VNode {
    return (
      <router-view></router-view>
    );
  }
}
