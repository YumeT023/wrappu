import { SArgs, UnmodifiableCmd } from "../../interface/cli_metadata";

/**
 * Interface that specifies a cmd runnable who is `responsible` for building cmd line
 * from the provided values and running it
 *
 * `note` that the `Runnable` is not responsible for args validation
 */
export interface Runnable {
  readonly cmd: UnmodifiableCmd;
  readonly path: string;
  /**
   * display the built `raw` cmd
   */
  raw(): string;
  /**
   * run `normalized` cmd line
   *
   * @throws {RuntimeCmd} whenever the command line failed to execute
   */
  run(): string;
  /**
   * run cmd template with the passed args
   *
   * @throws {RuntimeCmd} whenever the command line failed to execute
   */
  run(args: SArgs): string;
}
