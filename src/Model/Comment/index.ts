
export default class Comment {
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
