
export default class CheckItem {
  private type: string;
  private name: string;
  private suggestions: [string, string][];

  /**
   * 检查项目类型
   */
  public get Type(): string {
    return this.type;
  }
  /**
   * 检查项目名称
   */
  public get Name(): string {
    return this.name;
  }
  /**
   * 检查意见列表
   */
  public get Suggestions(): [string, string][] {
    return this.suggestions;
  }

  public constructor(
    type: string,
    name: string,
    suggestions: [string, string][],
  ) {
    this.type = type;
    this.name = name;
    this.suggestions = suggestions;
  }
}
