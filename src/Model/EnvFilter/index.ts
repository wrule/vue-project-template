import EnvOS from "./EnvOS";

export default class EnvFilter {
  private os: EnvOS;

  public constructor() {
    this.os = EnvOS.MacOS;
  }
}
