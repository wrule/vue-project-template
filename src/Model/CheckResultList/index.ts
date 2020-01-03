import CheckResult from '../CheckResult';
import CheckItem from '../CheckResult/CheckItem';

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
      // 不分类查看，整合成为一个栏目
      const totalList: CheckItem[] = [];
      this.resultList.forEach((result) => {
        totalList.push(...result.Items);
      });
      return [
        new CheckResult('全部', totalList),
      ];
    }
  }

  public constructor(list: CheckResult[]) {
    this.resultList = list;
  }
}
