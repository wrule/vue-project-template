
namespace XXFox.Model.Query {
  /**
   * @class 参数评论类
   */
  export class Comment {
    private avatar?: string;
    private name: string;
    private date: string;
    private content: string;

    /**
     * 评论者头像
     */
    public get Avatar(): string {
      return this.avatar || '';
    }
    /**
     * 评论者昵称
     */
    public get Name(): string {
      return this.name;
    }
    /**
     * 发表评论时间
     */
    public get Date(): string {
      return this.date;
    }
    /**
     * 评论内容
     */
    public get Content(): string {
      return this.content;
    }

    /**
     * @constructor 构造函数
     * @param name 评论者昵称
     * @param date 评论发布时间
     * @param content 评论内容
     * @param avatar 评论者头像（非必填）
     */
    public constructor(
      name: string,
      date: string,
      content: string,
      avatar?: string,
    ) {
      this.name = name;
      this.date = date;
      this.content = content;
      this.avatar = avatar;
    }
  }
}
