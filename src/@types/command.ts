/**
 * Interface that specifies a `cli wrapper`
 */
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
  arg(key: string, type?: ArgType): this;
}

/**
 * alias for `argument` key
 */
export type ArgKey = string;

/**
 * a record<k, t> or argument: where `k` refer the arg and `t` refer the key type
 */
export type Args = Map<ArgKey, ArgType>;

/**
 * it defines setting template
 *
 * `SPACE`: --template example
 *
 * `EQ`: --template=example
 */
export enum ArgSeparator {
  SPACE = ' ',
  EQ = '='
}

/**
 * ArgType specifies an `arg` value.
 *
 * a `bool` is typically set as follows: `--boolean-arg`
 *
 * a `str` is set as follows: --arg-val=1 or --arg-val 1
 */
export enum ArgType {
  BOOL = "boolean",
  STR = "string",
}
