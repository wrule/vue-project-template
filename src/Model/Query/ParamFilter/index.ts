namespace XXFox.Model.Query {
  /**
   * @class 参数条件过滤器类
   */
  export class ParamsFilter {
    /**
     * 这是一个静态函数
     * 其功能是根据输入的参数构建一个可描述参数特征的过滤器
     * 通常这个过滤器是只读的，仅仅用于展示
     * @param param 输入的参数
     */
    public static BuildFromParam(param: any): ParamsFilter {
      return new ParamsFilter();
    }

    /**
     * 存储过滤状态的对象
     */
    private readonly flags = {
      x: true,
      xx: true,
      d: true,
      b: true,
      i: true,
      s: true,
      dub: true,
      l: true,
      r: true,
    };

    /**
     * -X类型，比如-Xmx100M
     */
    public get X(): boolean {
      return this.flags.x;
    }
    public set X(nv: boolean) {
      this.flags.x = nv;
    }
    /**
     * -XX类型，比如-XX:PermSize=256M
     */
    public get XX(): boolean {
      return this.flags.xx;
    }
    public set XX(nv: boolean) {
      this.flags.xx = nv;
    }
    /**
     * -D类型，比如-Dcom.sun.management.jmxremote.port=9981
     */
    public get D(): boolean {
      return this.flags.d;
    }
    public set D(nv: boolean) {
      this.flags.d = nv;
    }
    /**
     * 布尔值
     */
    public get B(): boolean {
      return this.flags.b;
    }
    public set B(nv: boolean) {
      this.flags.b = nv;
    }
    /**
     * 整型
     */
    public get I(): boolean {
      return this.flags.i;
    }
    public set I(nv: boolean) {
      this.flags.i = nv;
    }
    /**
     * 字符串
     */
    public get S(): boolean {
      return this.flags.s;
    }
    public set S(nv: boolean) {
      this.flags.s = nv;
    }
    /**
     * Double 类型
     */
    public get DUB(): boolean {
      return this.flags.dub;
    }
    public set DUB(nv: boolean) {
      this.flags.dub = nv;
    }
    /**
     * 是否可动态设置
     */
    public get L(): boolean {
      return this.flags.l;
    }
    public set L(nv: boolean) {
      this.flags.l = nv;
    }
    /**
     * 各个版本之间是否存在变化
     */
    public get R(): boolean {
      return this.flags.r;
    }
    public set R(nv: boolean) {
      this.flags.r = nv;
    }
    /**
     * 获取描述过滤器当前状态的逗号字符串
     */
    public get StateStr(): string {
      const commaStr = Object
        .keys(this.flags)
        .filter((key) => (this.flags as any)[key])
        .join(',');
      if (commaStr.length > 0) {
        return `,${commaStr},`;
      } else {
        return '';
      }
    }

    /**
     * 针对某一参数返回当前过滤条件下的过滤结果
     * @param 待过滤器验证的参数
     * @returns 参数是否符合当前过滤条件
     */
    public Filter(param: any): boolean {
      return false;
    }

    public constructor() {}
  }
}
