/*
/**
 * a Record for commands where `string` is the `cmd name` and `CMD` is the cmd as an object
 */
import { Command } from "./cli";

export type Commands = Map<string, Command>;

/**
 * a cmdInterface that is no longer mutable and so is ready to be injected in a runnable
 */
export type UnmodifiableCmd = Readonly<Omit<Command, "arg">>;

/**
 * each arg has specific `option/constraint`
 */
export interface ArgOptions {
  asAlias?: boolean;
  type?: ArgType;
}

/**
 * it defines setting template
 *
 * `SPACE`: --template example
 *
 * `EQ`: --template=example
 */
export enum ArgSeparator {
  SPACE = " ",
  EQ = "=",
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

/**
 * arg that specifies an `arg metadata` which are: options, name, value
 */
export interface ArgMetadata {
  name: string;
  value: string | boolean | null;
  option: ArgOptions;
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
