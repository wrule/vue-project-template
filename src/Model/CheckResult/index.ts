import CheckItem from './CheckItem';

export default class CheckResult {
  private name: string;
  private items: CheckItem[];

  /**
   * 检查结果类型名称
   */
  public get Name(): string {
    return this.name;
  }
  /**
   * 同类型下的项目
   */
  public get Items(): CheckItem[] {
    return this.items;
  }
  /**
   * 同类型下的项目个数
   */
  public get Count(): number {
    return this.items.length;
  }

  public constructor(
    name: string,
    items: CheckItem[],
  ) {
    this.name = name;
    this.items = items;
  }
}
