/** error are qualified using its `id` */
export enum Code {
  /** unknown `arg` */
  UNKNOWN_ARG = "001",
  /** unknown `cmd` */
  UNKNOWN_CMD = "002",
  /** duplicate `arg` */
  DUPLICATED_ARG = "003",
  /** duplicate `cmd` */
  DUPLICATED_CMD = "003",
  /** arg constraint `violation` */
  ARG_CONSTRAINT_VIOLATION = "004",
  /** missing arg value `violation` */
  MISSING_ARG = "005",
  /** unexpected `arg` */
  UNEXPECTED_ARG = "006",
  /** runtime cmd exception, which is a generic error called when a cmd fails */
  RUNTIME_CMD = "007",
}

export abstract class WrappuError {
  readonly name: string;
  protected message: string;

  protected constructor(protected code: Code) {
    this.name = this.constructor.name;
  }

  static throw(error: WrappuError) {
    error._throwIt();
  }

  private _throwIt(): never {
    throw this;
  }
}
