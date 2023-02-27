import { CMDInterface, SArgs } from "./command";

/**
 * Interface that specifies a runner who is `responsible` for building cmd line
 * from the provided values and running it
 *
 * `note` that the `Runner` is not responsible for args validation
 */
export interface RunnerInterface {
  readonly path: string;
  readonly cmd: CommittedCmd;
  readonly args: SArgs;

  /**
   * run `normalized` cmd line
   */
  run(): void;
}

/**
 * a cmdInterface that is no longer mutable
 */
export type CommittedCmd = Readonly<
  Omit<CMDInterface, "arg" | "validateArgsConstraints">
>;
