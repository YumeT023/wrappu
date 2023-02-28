import { Exception } from "../@types/error";
import { Code } from "../constant/error";
import { format } from "./utils/format";

export abstract class GenericException implements Exception {
  code: Code = null;
  stack: string;
  message: string;
  name: string;

  protected constructor(message: string) {
    this.message = message;
    this.name = this.constructor.name;

    this._injectError();
  }

  /**
   * Inject default `Error` prototype into this class
   *
   * <br/>
   * Then Move the stack trace at this class's constructor
   */
  private _injectError() {
    const error = new Error();

    error.name = this.name;

    Error.captureStackTrace(error, this.constructor);

    error.message = format(this);

    Object.setPrototypeOf(this, error);
  }
}
