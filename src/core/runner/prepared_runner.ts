import { Runnable } from "./runnable";
import { SArgs, UnmodifiableCmd } from "../../interface/cli_metadata";
import {
  renderArgTemplate,
  renderOnItsPlaceholder,
} from "../../common/arg_util";
import {
  placeholderOf,
  removePlaceholder as rmPlaceholder,
} from "../../common/interpolation";
import { MissingArg, UnexpectedArg, WrappuError } from "../../common/error";
import { executeCommand } from "../../common/command_util";

export class PreparedRunner implements Runnable {
  private _template: string;

  constructor(
    readonly path: string,
    readonly cmd: UnmodifiableCmd,
    private readonly placeholders = Array<string>()
  ) {
    this._createTemplate();
  }

  raw(): string {
    return this._template;
  }

  run(args: SArgs = {}) {
    const unexpectedArgs = [];
    let localTemplate = this._template;

    this.cmd.validateArgsConstraints(args);

    for (const name in args) {
      if (this.placeholders.includes(name)) {
        const meta = {
          name,
          value: args[name],
          option: this.cmd.args.get(name),
        };
        localTemplate = renderOnItsPlaceholder(
          localTemplate,
          placeholderOf(name),
          meta
        );
      } else unexpectedArgs.push(name);
    }
    const remainingPlaceholder =
      localTemplate.match(new RegExp(/{(.*?)}/, "g")) || [];

    if (remainingPlaceholder.length) {
      WrappuError.throw(
        new MissingArg(this._template, remainingPlaceholder.map(rmPlaceholder))
      );
    }
    if (unexpectedArgs.length) {
      WrappuError.throw(new UnexpectedArg(this._template, unexpectedArgs));
    }
    return executeCommand(localTemplate);
  }

  private _createTemplate() {
    const temp = [];

    for (let arg of this.placeholders) {
      const argOption = this.cmd.args.get(arg);
      temp.push(renderArgTemplate(arg, argOption));
    }
    const truncated = temp.join(" ");
    this._template = `${this.path} ${this.cmd.name} ${truncated}`;
  }
}
