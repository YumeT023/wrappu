import { ImmutableCMD, SArgs } from "../@types/utils";
import { Runnable } from "../@types/core";
import { boolArg, stringArg } from "./utils/arg";
import { ArgType } from "../constant/arg";
import { exec } from "../utils/cmd";

export class Runner implements Runnable {
  readonly args: SArgs;
  readonly cmd: ImmutableCMD;
  readonly path: string;
  private memberVarCommandLine: string[];

  constructor(path: string, cmd: ImmutableCMD, args: SArgs) {
    this.cmd = cmd;
    this.args = args;
    this.path = path;

    this.memberVarCommandLine = [path];

    this.setupCMD();
  }

  private setupCMD() {
    this.memberVarCommandLine.push(this.cmd.name);

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

    this.memberVarCommandLine.push(...temp);
  }

  run(): void {
    exec(this.memberVarCommandLine.join('  '), console.log);
  }
}
