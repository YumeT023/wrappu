/**
 * Interface that specifies a `cli wrapper`
 */
export interface ClwInterface {
  /**
   * the `cli path` in which the wrapper overlap
   */
  readonly path: string;

  /**
   * check if the specified `path` is a valid one
   */
  check(): void;
}
