
namespace XXFox.Model {
  /**
   * 参数编辑器
   */
  export class ParamsEditor {
    /**
     * 内部存储的参数文本
     */
    private text: string;

    /**
     * 获取参数的文本形式表现
     */
    public get Text(): string {
      return this.text;
    }
    /**
     * 以文本的形式设置参数
     */
    public set Text(nv: string) {
      this.text = nv;
    }
    /**
     * 获取参数的列表形式表现
     */
    public get List(): string[] {
      return this.text.split(/\s+/).filter((item) => item.length > 0);
    }
    /**
     * 判断参数是否为空
     */
    public get IsEmpty(): boolean {
      return this.List.length < 1;
    }

    /**
     * 对普通字符串进行正则转义
     * @param str 需进行转义的普通字符串
     * @returns 转义后的正则字符串
     */
    private escapeRegExp(str: string): string {
      return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    /**
     * 删除某一个参数
     * @param param 待删除的参数
     */
    public RemoveParam(param: string): void {
      const regex = new RegExp(`${this.escapeRegExp(param)}\\s*`, 'g');
      this.text = this.text.replace(regex, '');
    }
    /**
     * 更新某一个参数
     * @param param 待更新的参数
     * @param newParam 新的参数值
     */
    public UpdateParam(param: string, newParam: string): void {
      const regex = new RegExp(`${this.escapeRegExp(param)}`, 'g');
      this.text = this.text.replace(regex, newParam);
    }
    /**
     * 清空参数
     */
    public Clear(): void {
      this.text = '';
    }

    /**
     * 构造函数
     * @constructor
     * @param text 参数文本
     */
    public constructor(text: string) {
      this.text = text;
    }
  }
}
