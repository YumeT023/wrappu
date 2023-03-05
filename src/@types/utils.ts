import { ArgType } from "../constant/arg";
import { CMD } from "./core";

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