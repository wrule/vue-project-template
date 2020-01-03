import ParamsFilter from '../ParamFilter';
import Comment from '../Comment';
import DefaultValue from '../DefaultValue';

/**
 * 参数查询结果
 */
export default class QueryResult {
  private paramName: string;
  private paramMeaning: string;
  private filterMark: ParamsFilter;
  private suggestions: string[];
  private comments: Comment[];
  private defaultValue: DefaultValue;
  private clubCmtCount: number;

  /**
   * 参数名称
   */
  public get ParamName(): string {
    return this.paramName;
  }
  /**
   * 参数意义
   */
  public get ParamMeaning(): string {
    return this.paramMeaning;
  }
  /**
   * 参数过滤器标志
   */
  public get FilterMark(): ParamsFilter {
    return this.filterMark;
  }
  /**
   * 参数使用建议
   */
  public get Suggestions(): string[] {
    return this.suggestions;
  }
  /**
   * 参数精选评论
   */
  public get Comments(): Comment[] {
    return this.comments;
  }
  /**
   * 参数默认值
   */
  public get DefaultValue(): DefaultValue {
    return this.defaultValue;
  }
  /**
   * 参数社区评论计数
   */
  public get ClubCmtCount(): number {
    return this.clubCmtCount;
  }
  /**
   * 参数是否存在社区讨论
   */
  public get HasClubCmt(): boolean {
    return this.clubCmtCount > 0;
  }

  public constructor(
    paramName: string,
    paramMeaning: string,
    filterMark: ParamsFilter,
    suggestions: string[],
    comments: Comment[],
    defaultValue: DefaultValue,
    clubCmtCount: number,
  ) {
    this.paramName = paramName;
    this.paramMeaning = paramMeaning;
    this.filterMark = filterMark;
    this.suggestions = suggestions;
    this.comments = comments;
    this.defaultValue = defaultValue;
    this.clubCmtCount = clubCmtCount;
  }
}
