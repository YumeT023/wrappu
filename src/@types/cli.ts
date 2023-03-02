/**
 * Interface that specifies a `cli wrapper`
 */
import { ArgType } from "../constant/arg";

export interface CliWrapper {
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
   * register new `cmd` in the cli
   *
   * @throws Error: when you attempt to register the same `cmd` twice
   * @return `this` to allow `cascading`
   */
  cmd(cmd: CMD): this;

  /**
   * setup new job by `cmd` name and provide `args` for it
   */
  setup(cmdName: string, args?: SArgs): Runnable;
}

/**
 * Interface that specifies a `cmd` in a `cli`
 */
export interface CMD {
  readonly name: string;
  args: Args;

  /**
   * register an `arg` key in the `cmd` context with its `options`
   *
   * options is by default: type: 'string', asAlias: false
   *
   * @throws Error: when you attempt to register the same `arg name` twice
   * @return `this` to allow `cascading`
   */
  arg(key: string, options?: ArgOptions): this;

  /**
   * ensure that the given args exist and haven't violated their type `Constraint`
   */
  validateArgsConstraints(args: SArgs): void;
}

/**
 * Interface that specifies a cmd runnable who is `responsible` for building cmd line
 * from the provided values and running it
 *
 * `note` that the `Runnable` is not responsible for args validation
 */
export interface Runnable {
  readonly path: string;
  readonly cmd: ImmutableCMD;
  readonly args: SArgs;
  /**
   * run `normalized` cmd line
   */
  run(): void;
}

/**
 * a Record for commands where `string` is the `cmd name` and `CMD` is the cmd as an object
 */
export type Commands = Map<string, CMD>;

/**
 * a cmdInterface that is no longer mutable and so is ready to be injected in a runnable
 */
export type ImmutableCMD = Readonly<Omit<CMD, "arg">>;

/**
 * each arg has specific `option/constraint`
 */
export interface ArgOptions {
  asAlias?: boolean;
  type?: ArgType;
}

/**
 * a Record for args
 *
 * it is mainly used to specify `args`
 */
export type Args = Map<string, ArgOptions>;

/**
 * a Record for args
 *
 * it is mainly used to pass `args` with its `value`
 */
export type SArgs = Record<string, string | boolean | null>;
