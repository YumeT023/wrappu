import { Runnable } from "./runnable";
import {
  ArgMetadata,
  SArgs,
  UnmodifiableCmd,
} from "../../interface/cli_metadata";
import { renderArgValue } from "../../common/arg_util";
import { executeCommand } from "../../common/command_util";

export class Runner implements Runnable {
  private _command: string;

  constructor(
    readonly path: string,
    readonly cmd: UnmodifiableCmd,
    private readonly args: SArgs
  ) {
    this._build();
  }

  raw() {
    return this._command;
  }

  run() {
    return executeCommand(this._command);
  }

  private _build() {
    const temp = [];

    for (let name in this.args) {
      const meta: ArgMetadata = {
        name,
        value: this.args[name],
        option: this.cmd.args.get(name),
      };

      temp.push(renderArgValue(meta));
    }
    const truncated = temp.join(" ");
    this._command = `${this.path} ${this.cmd.name} ${truncated}`;
  }
}
