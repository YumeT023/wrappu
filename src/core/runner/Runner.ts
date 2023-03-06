import { ArgMetadata, ImmutableCMD, SArgs } from "../../@types/utils";
import { Runnable } from "../../@types/core";
import { renderArgValue } from "../utils/arg";
import { exec } from "../../utils/cmd";

export class Runner implements Runnable {
  readonly cmd: ImmutableCMD;
  readonly path: string;
  private memberVarCommandLine: string[];
  private readonly args: SArgs;

  constructor(path: string, cmd: ImmutableCMD, args: SArgs) {
    this.cmd = cmd;
    this.args = args;
    this.path = path;

    this.setupCMD();
  }

  private setupCMD() {
    let temp = [];

    for (let [name, value] of Object.entries(this.args)) {
      const option = this.cmd.args.get(name);
      const metadata: ArgMetadata = {
        name,
        value,
        option,
      };

      temp.push(renderArgValue(metadata));
    }

    this.memberVarCommandLine = [this.path, this.cmd.name, ...temp];
  }

  raw() {
    return this.memberVarCommandLine.join(" ");
  }

  run() {
    return exec(this.memberVarCommandLine.join("  "));
  }
}
