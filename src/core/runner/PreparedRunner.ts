import { CMD, PreparedRunnable } from "../../@types/core";
import { ImmutableCMD, SArgs } from "../../@types/utils";
import { renderArgTemplate, renderOnItsPlaceholder } from "../utils/arg";
import { placeholderOf, removePlaceholder } from "../../utils/placeholder";
import { exec } from "../../utils/cmd";
import { MissingArgException, UnexpectedArgException } from "../../errors";

export class PreparedRunner implements PreparedRunnable {
  private readonly placeholders: string[];
  private rawTemplate: string;
  path: string;
  cmd: Readonly<Omit<CMD, "arg">>;

  constructor(path: string, cmd: ImmutableCMD, placeholders = Array<string>()) {
    this.placeholders = placeholders;
    this.path = path;
    this.cmd = cmd;

    this.template();
  }

  raw(): string {
    return this.rawTemplate;
  }

  run(args: SArgs) {
    let localVarTemplate = this.rawTemplate;
    let unexpectedArgs = [];

    this.cmd.validateArgsConstraints(args);

    for (let [name, value] of Object.entries(args)) {
      if (this.placeholders.includes(name)) {
        const metadata = { name, value, option: this.cmd.args.get(name) };
        localVarTemplate = renderOnItsPlaceholder(
          localVarTemplate,
          placeholderOf(name),
          metadata
        );
      } else {
        unexpectedArgs.push(name);
      }
    }

    const remainingPlaceholder =
      localVarTemplate.match(new RegExp(/{(.*?)}/, "g")) || [];

    if (remainingPlaceholder.length) {
      throw MissingArgException(
        this.rawTemplate,
        remainingPlaceholder.map(removePlaceholder)
      );
    }

    if (unexpectedArgs.length) {
      throw UnexpectedArgException(this.rawTemplate, unexpectedArgs);
    }

    return exec(localVarTemplate);
  }

  private template() {
    const temp = [];

    for (let arg of this.placeholders) {
      const argOption = this.cmd.args.get(arg);
      temp.push(renderArgTemplate(arg, argOption));
    }

    this.rawTemplate = [this.path, this.cmd.name, ...temp].join(" ");
  }
}
