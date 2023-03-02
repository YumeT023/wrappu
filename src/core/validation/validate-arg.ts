import { ArgOptions } from "../../@types/cli";
import { ArgType } from "../../constant/arg";
import { ArgConstraintViolationException } from "../../errors/ArgConstraintViolationException";

type ValidateArg = {
  (name: string, value: any, cmd: string, constraint: ArgOptions): void;
};

function checkBoolArg(value: any) {
  return !/^(true|false)$/.test(value);
}

export const validateArg: ValidateArg = (name, value, cmd, constraint) => {
  if ((constraint.type === ArgType.STR && !value) || checkBoolArg(value)) {
    throw ArgConstraintViolationException(name, value, constraint.type, cmd);
  }
};
