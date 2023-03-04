import { ImmutableCMD, Runnable, SArgs } from "../@types/cli";
import { boolArg, stringArg } from "./utils/arg";
import { exec } from "./utils/cmd";
import { ArgType } from "../constant/arg";

export class Runner implements Runnable {
  readonly args: SArgs;
  readonly cmd: ImmutableCMD;
  readonly path: string;
  private _readyCmdLine: string[];

  constructor(path: string, cmd: ImmutableCMD, args: SArgs) {
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
      const arg = this.cmd.args.get(name);
      let normalized;

      switch (arg.type) {
        case ArgType.BOOL:
          normalized = boolArg(name, arg.asAlias);
          break;
        case ArgType.STR:
          normalized = stringArg(name, String(value), arg.asAlias);
          break;
      }

      temp.push(normalized);
    }

    this._readyCmdLine.push(...temp);
  }

  // TODO: think about another approach because each cmds have different exec duration
  run(): void {
    exec(this._readyCmdLine.join(" "));
  }
}
