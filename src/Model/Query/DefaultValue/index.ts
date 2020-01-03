
namespace XXFox.Model.Query {
  /**
   * @class 参数的默认值类
   */
  export class DefaultValue {
    private type: string;
    private values: string[][];
  
    /**
     * 默认值类型
     */
    public get Type(): string {
      return this.type;
    }
    /**
     * 获取单元格内容
     * @param y 单元格y偏移地址
     * @param x 单元格x偏移地址
     */
    public GetCell(y: number, x: number): string {
      return this.values[y][x] || '';
    }
  
    /**
     * @constructor 构造函数
     * @param type 默认值类型
     * @param values 默认值表格（这是一个字符串二维数组）
     */
    public constructor(type: string, values: string[][]) {
      this.type = type;
      this.values = values.map((list) => list.map((str) => str));
    }
  }
}
