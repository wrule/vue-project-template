export default class Student {
  private name: string = '';
  private age: number = 0;
  private sex: boolean = true;
  private remark: string = '';

  public get Name(): string {
    return this.name;
  }
  public set Name(nv: string) {
    this.name = nv;
  }
  public get Age(): number {
    return this.age;
  }
  public set Age(nv: number) {
    this.age = nv;
  }
  public get Sex(): boolean {
    return this.sex;
  }
  public set Sex(nv: boolean) {
    this.sex = nv;
  }
  public get Remark(): string {
    return this.remark;
  }
  public set Remark(nv: string) {
    this.remark = nv;
  }

  public constructor() {}
}
