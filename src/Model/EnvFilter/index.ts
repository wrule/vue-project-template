import EnvOS from './EnvOS';
import EnvWordSize from './EnvWordSize';
import EnvJDKVersion from './EnvJDKVersion';
import EnvUnit from './EnvUnit';

/**
 * @class 运行环境过滤器
 */
export default class EnvFilter {
  private coreNum: number;
  private memSize: number;
  private memUnit: EnvUnit;
  private os: EnvOS;
  private wordSize: EnvWordSize;
  private jdkVersion: EnvJDKVersion;

  /**
   * CPU核数
   */
  public get CoreNum(): number {
    return Math.floor(this.coreNum);
  }
  public set CoreNum(nv: number) {
    this.coreNum = Math.floor(nv);
  }
  /**
   * 内存大小
   */
  public get MemSize(): number {
    return Math.floor(this.memSize);
  }
  public set MemSize(nv: number) {
    this.memSize = Math.floor(nv);
  }
  /**
   * 内存大小单位
   */
  public get MemUnit(): EnvUnit {
    return this.memUnit;
  }
  public set MemUnit(nv: EnvUnit) {
    this.memUnit = nv;
  }
  /**
   * 操作系统类型
   */
  public get OS(): EnvOS {
    return this.os;
  }
  public set OS(nv: EnvOS) {
    this.os = nv;
  }
  /**
   * 操作系统字长
   */
  public get WordSize(): EnvWordSize {
    return this.wordSize;
  }
  public set WordSize(nv: EnvWordSize) {
    this.wordSize = nv;
  }
  /**
   * JDK版本
   */
  public get JDKVersion(): EnvJDKVersion {
    return this.jdkVersion;
  }
  public set JDKVersion(nv: EnvJDKVersion) {
    this.jdkVersion = nv;
  }
  /**
   * 内存大小字符串
   */
  public get MemStr(): string {
    return `${this.MemSize.toString()}${this.MemUnit.toString()}`;
  }

  public constructor(
    coreNum: number,
    memSize: number,
    memUnit: EnvUnit,
    os: EnvOS,
    wordSize: EnvWordSize,
    jdkVersion: EnvJDKVersion,
  ) {
    this.coreNum = coreNum;
    this.memSize = memSize;
    this.memUnit = memUnit;
    this.os = os;
    this.wordSize = wordSize;
    this.jdkVersion = jdkVersion;
  }
}
