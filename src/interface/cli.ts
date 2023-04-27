import { Runnable } from "../core/runner";
import { ArgOptions, Args, Commands, SArgs } from "./cli_metadata";

/**
 * Interface that specifies a `cli wrapper`
 */
export interface CLI {
  /**
   * the `cli path` in which the wrapper overlap
   */
  readonly path: string;
  /**
   * list of `Command` for the cli wrapper
   */
  commands: Commands;

  /**
   * register new `Command` in the cli
   *
   * @throws Error: when you attempt to register the same `Command` twice
   * @return `this` to allow `cascading`
   */
  cmd(Command: Command): this;

  /**
   * setup new job by `Command` name and provide `args` for it
   */
  setup(Command: string, args?: SArgs): Runnable;

  /**
   * like `prepared statement`, prepare(...) function allows you to write a `PreparedRunnable`
   * and re-run it anytime with different value
   *
   * placeholders here is a list of args [that this Command should own]
   *
   * @throws {UnknownArg} if any placeholders do not exist in this Command 's `arg` record
   */
  setup(Command: string, ...placeholders: string[]): Runnable;
}

/**
 * Interface that specifies a `Command` in a `cli`
 */
export interface Command {
  readonly name: string;
  args: Args;

  /**
   * register an `arg` key in the `Command` context with its `options`
   *
   * options is by default: type: 'string', asAlias: false
   *
   * @throws {DuplicatedArg}: when you attempt to register the same `arg name` twice
   * @return `this` to allow `cascading`
   */
  arg(key: string, options?: ArgOptions): this;

  /**
   * ensure that the given args exist and haven't violated their type `Constraint`
   *
   * @throws {ArgConstraintViolation} if any arg violate their spec
   */
  validateArgsConstraints(args: SArgs): void;

  /**
   * check that all the given `args` exist in this `Command`
   *
   * @throws {UnknownArg} if any args do not exist in this `Command`
   */
  checkContainArgs(args: string[]): void;
}
