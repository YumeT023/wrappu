import { CommittedCmd, RunnerInterface, SArgs } from "../@types";
import { boolArg, stringArg } from "../utils/arg";
import { exec } from "../utils/cmd";
import { ArgType } from "../constant/enum";

export class Runner implements RunnerInterface {
  readonly args: SArgs;
  readonly cmd: CommittedCmd;
  readonly path: string;
  private _readyCmdLine: string[];

  constructor(path: string, cmd: CommittedCmd, args: SArgs) {
    this.cmd = cmd;
    this.args = args;
    this.path = path;

    this._readyCmdLine = [path];

    this._normalize();
  }

  private _normalize() {
    this._readyCmdLine.push(this.cmd.name);

    let temp = [];

    for (let [name, value] of Object.entries(this.args)) {
      const type = this.cmd.args.get(name);
      let normalized;

      switch (type) {
        case ArgType.BOOL:
          normalized = boolArg(name);
          break;
        case ArgType.STR:
          normalized = stringArg(name, String(value));
          break;
      }

      temp.push(normalized);
    }

    this._readyCmdLine.push(...temp);
  }

  run(): void {
    exec(this._readyCmdLine.join(" "));
  }
}
