import CheckResult from '../CheckResult';

export default class CheckResultList {
  private classified: boolean = true;
  private resultList: CheckResult[];

  /**
   * 获取是否分类
   */
  public get Classified(): boolean {
    return this.classified;
  }
  /**
   * 设置是否分类
   */
  public set Classified(nv: boolean) {
    this.classified = nv;
  }
  /**
   * 获取检查结果列表
   */
  public get List(): CheckResult[] {
    if (this.classified) {
      return this.resultList;
    } else {
      return [];
    }
  }

  public constructor(list: CheckResult[]) {
    this.resultList = list;
  }
}
