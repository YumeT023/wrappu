import { Code as ErrorCode } from "../constant/error";

/**
 * Interface that specifies an exception
 */
export interface Exception {
  code: ErrorCode;
  message: string;
  name: string;
}
