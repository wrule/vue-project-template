
namespace XXFox.Model.Check {
  /**
   * @class 检查项目类
   */
  export class CheckItem {
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
  
    /**
     * @constructor 构造函数
     * @param type 检查项目类型
     * @param name 检查项目名称
     * @param suggestions 检查项目建议列表
     */
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
}
