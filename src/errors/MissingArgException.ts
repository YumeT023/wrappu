import { Exception } from "../@types/error";
import { Code } from "../constant/error";
import { interpolate } from "../utils/placeholder";
import { normalize } from "./utils/normalize";

class MissingArg implements Exception {
  private static readonly TEMPLATE = `missing args [{}] in the placeholder ('{}')`;
  code: Code;
  message: string;
  name: string;

  constructor(template: string, args: string[]) {
    this.code = Code.MISSING_ARG;
    this.message = interpolate(MissingArg.TEMPLATE, args.join(", "), template);
    this.name = MissingArg.name;
  }
}

export const MissingArgException = (template: string, args: string[]) => {
  return normalize(new MissingArg(template, args), MissingArgException);
};
