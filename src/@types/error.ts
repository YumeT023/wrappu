import { Code } from "../constant/error";

/**
 * Interface that specifies an exception
 */
export interface Exception {
  code: Code;
  message: string;
  name: string;
  stack: string;
}

export type FormatException = Omit<Exception, 'stack'>
