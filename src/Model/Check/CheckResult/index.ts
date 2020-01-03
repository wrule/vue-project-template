
namespace XXFox.Model.Check {
  /**
   * @class 检查结果类
   */
  export class CheckResult {
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
  
    /**
     * @constructor 构造函数
     * @param name 检查结果类型名称
     * @param items 检查项目列表
     */
    public constructor(
      name: string,
      items: CheckItem[],
    ) {
      this.name = name;
      this.items = items;
    }
  }  
}
