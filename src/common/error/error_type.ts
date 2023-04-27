import { Code, WrappuError } from "./error";
import { ArgType } from "../../interface/cli_metadata";
import { interpolate } from "../interpolation";

export class UnknownArg extends WrappuError {
  private static readonly TEMPLATE =
    "arg('{}') seems to be unknown to cmd('{}')";

  constructor(arg: string, cmd: string) {
    super(Code.UNKNOWN_ARG);
    this.message = interpolate(UnknownArg.TEMPLATE, arg, cmd);
  }
}

export class UnexpectedArg extends WrappuError {
  private static readonly TEMPLATE = `Unexpected args [{}] in the placeholder ('{}')`;

  constructor(template: string, args: string[]) {
    super(Code.UNEXPECTED_ARG);
    this.message = interpolate(
      UnexpectedArg.TEMPLATE,
      args.join(", "),
      template
    );
  }
}

export class UnknownCmd extends WrappuError {
  private static readonly TEMPLATE = `Unknown cmd('{}')`;

  constructor(cmd: string) {
    super(Code.UNKNOWN_CMD);
    this.message = interpolate(UnknownCmd.TEMPLATE, cmd);
  }
}

export class MissingArg extends WrappuError {
  private static readonly TEMPLATE = `missing args [{}] in the placeholder ('{}')`;

  constructor(template: string, args: string[]) {
    super(Code.MISSING_ARG);
    this.message = interpolate(MissingArg.TEMPLATE, args.join(", "), template);
  }
}

export class ArgConstraintViolation extends WrappuError {
  private static readonly TEMPLATE = `arg value '{}' doesn't satisfy the constraint arg({}: {}) of cmd('{}')`;

  constructor(value: any, name: string, type: ArgType, cmd: string) {
    super(Code.ARG_CONSTRAINT_VIOLATION);
    this.message = interpolate(
      ArgConstraintViolation.TEMPLATE,
      value,
      name,
      type,
      cmd
    );
  }
}

export class DuplicatedArg extends WrappuError {
  private static readonly TEMPLATE = `can't register arg('{}') more than one time in cmd('{}')`;

  constructor(arg: string, cmd: string) {
    super(Code.DUPLICATED_ARG);
    this.message = interpolate(DuplicatedArg.TEMPLATE, arg, cmd);
  }
}

export class DuplicatedCmd extends WrappuError {
  private static readonly TEMPLATE = `can't register cmd('{}') anymore. ensure it hasn't been registered before`;

  constructor(cmd: string) {
    super(Code.DUPLICATED_CMD);
    this.message = interpolate(DuplicatedCmd.TEMPLATE, cmd);
  }
}

export class RuntimeCmd extends WrappuError {
  constructor(error: string) {
    super(Code.RUNTIME_CMD);
    this.message = error;
  }
}
