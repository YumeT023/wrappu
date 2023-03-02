import { Code } from "../constant/error";

/**
 * Interface that specifies an exception
 */
export interface Exception {
  code: Code;
  message: string;
  name: string;
}
