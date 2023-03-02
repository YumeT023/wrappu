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
