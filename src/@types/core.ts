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
  setup(cmd: string, args?: SArgs): Runnable;

  /**
   * like `prepared statement`, prepare(...) function allows you to write a `PreparedRunnable`
   * and re-run it anytime with different value
   *
   * placeholders here is a list of args [that this cmd should own]
   *
   * @throws {UnknownArgException} if any placeholders do not exist in this cmd 's `arg` record
   */
  prepare(cmd: string, ...placeholders: string[]): PreparedRunnable;
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
   * @throws {DuplicateArgException}: when you attempt to register the same `arg name` twice
   * @return `this` to allow `cascading`
   */
  arg(key: string, options?: ArgOptions): this;

  /**
   * ensure that the given args exist and haven't violated their type `Constraint`
   *
   * @throws {ArgConstraintViolationException} if any arg violate their spec
   */
  validateArgsConstraints(args: SArgs): void;

  /**
   * check that all the given `args` exist in this `cmd`
   *
   * @throws {UnknownArgException} if any args do not exist in this `cmd`
   */
  checkContainArgs(args: string[]): void;
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

  /**
   * display the built `raw` cmd
   */
  raw(): string;

  /**
   * run `normalized` cmd line
   */
  run(): void;
}

/**
 * Interface that specifies a cmd `prepared` runnable, which works just like `prepared statement` in
 * `sql` drivers such as: PDO,
 */
export interface PreparedRunnable extends Omit<Runnable, 'run'> {
  /**
   * unlike the raw() of Runnable, `raw(...)` function show the `cmd` with the specified
   * placeholders
   */
  raw(): string;
  /**
   * run `prepared` cmd with the passed args
   */
  run(args: SArgs): void;
}
