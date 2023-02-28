import { ArgOptions } from "../@types/cli";
import { ArgType } from "./enum";

export const DEFAULT_ARG_OPTION: ArgOptions = {
  type: ArgType.STR,
  asAlias: false,
};
