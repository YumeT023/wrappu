import { ArgOptions, Args, Commands, ImmutableCMD, SArgs } from "./utils";

/**
 * Interface that specifies a `cli wrapper`
 */
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
