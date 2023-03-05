import { ArgOptions } from "../../@types/utils";
import { ArgConstraintViolationException } from "../../errors";
import { ArgType } from "../../constant/arg";
import { isBool } from "./utils";

type ValidateArg = {
  (name: string, value: any, cmd: string, constraint: ArgOptions): void;
};

export const validateArg: ValidateArg = (name, value, cmd, { type }) => {
  if (!value) {
    throw ArgConstraintViolationException(name, value, type, cmd);
  }

  if (
    (type === ArgType.STR && isBool(value)) ||
    (type === ArgType.BOOL && !isBool(value))
  ) {
    throw ArgConstraintViolationException(name, value, type, cmd);
  }
};
