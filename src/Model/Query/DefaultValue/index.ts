
export default class DefaultValue {
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

  public constructor(type: string, values: string[][]) {
    this.type = type;
    this.values = values.map((list) => list.map((str) => str));
  }
}
