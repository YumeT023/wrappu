/**
 * Interface that specifies a `cli wrapper`
 */
import { RunnerInterface } from "./runner";
import { ArgType } from "../constant/enum";

export interface ClwInterface {
  /**
   * the `cli path` in which the wrapper overlap
   */
  readonly path: string;

  /**
   * list of `cmd` for the cli wrapper
   */
  commands: Commands;

  /**
   * check if the specified `path` is a valid one
   */
  check(): void;

  /**
   * add new `cmd` in the cli
   */
  cmd(cmd: CMDInterface): this;

  /**
   * setup new job by `cmd` name and provide `args` for it
   */
  setup(cmdName: string, args?: SArgs): RunnerInterface;
}

/**
 * a record<a, c> or argument: where `a` refer the arg and `c` refer the Cmd
 */
export type Commands = Map<string, CMDInterface>;

/**
 * Interface that specifies a `cmd` in a `cli`
 */
export interface CMDInterface {
  readonly name: string;
  args: Args;

  /**
   * register an `arg` key in the `cmd` context with its `type`
   *
   * type is by default of type `string`
   * @throws Error: when you attempt to register the same `arg name` twice
   * @return `this` to allow `cascading`
   */
  arg(key: string, options?: ArgOptions): this;

  /**
   * ensure that the given args exist and haven't violated their type `Constraint`
   */
  validateArgsConstraints(args: SArgs): this;
}

/**
 * each arg has specific `option/constraint`
 */
export interface ArgOptions {
  asAlias?: boolean;
  type?: ArgType;
}

/**
 * alias for `argument` key
 */
export type ArgKey = string;

/**
 * a record<k, t> of argument: where `k` refer the arg and `t` refer the key type
 */
export type Args = Map<ArgKey, ArgOptions>;

/**
 * a record<k, v> of arg (in run context): where `k` refer the arg and `v` refer the arg value
 */
export type SArgs = Record<string, string | boolean | null>;
