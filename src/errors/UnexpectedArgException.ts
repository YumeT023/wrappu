import { Exception } from "../@types/error";
import { Code } from "../constant/error";
import { interpolate } from "../utils/placeholder";
import { normalize } from "./utils/normalize";

class UnexpectedArg implements Exception {
  private static readonly TEMPLATE = `Unexpected args [{}] in the placeholder ('{}')`;
  code: Code;
  message: string;
  name: string;

  constructor(template: string, args: string[]) {
    this.code = Code.UNEXPECTED_ARG;
    this.message = interpolate(
      UnexpectedArg.TEMPLATE,
      args.join(", "),
      template
    );
    this.name = UnexpectedArg.name;
  }
}

export const UnexpectedArgException = (template: string, args: string[]) => {
  return normalize(new UnexpectedArg(template, args), UnexpectedArgException);
};
