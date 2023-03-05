import { Exception } from "../../@types/error";
import { interpolate } from "../../utils/placeholder";

export const normalize = (exception: Exception, callFrom: Function) => {
  const error = new Error(exception.message);
  error.name = interpolate(`{}<\code: {}>`, exception.name, exception.code);
  Error.captureStackTrace(error, callFrom);

  return error;
};
