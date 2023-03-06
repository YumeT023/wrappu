import { ArgSeparator, ArgType } from "../../constant/arg";
import { ArgMetadata, ArgOptions } from "../../@types/utils";
import { placeholderOf } from "../../utils/placeholder";
import { isTrue } from "../validation/utils";

const prefix = (option: ArgOptions) => {
  let pre = "-";
  return !option.asAlias ? pre.concat("-") : pre;
};

export const renderArgValue = (
  metadata: ArgMetadata,
  sep = ArgSeparator.SPACE
) => {
  const { value, name, option } = metadata;
  const pre = prefix(option);

  switch (option.type) {
    case ArgType.BOOL:
      return isTrue(value) ? pre.concat(name) : "";
    case ArgType.STR:
      return pre.concat(name, sep, value as string);
  }
};

export const renderArgTemplate = (
  name: string,
  option: ArgOptions,
  sep = ArgSeparator.SPACE
) => {
  const pre = prefix(option);

  switch (option.type) {
    case ArgType.BOOL:
      return placeholderOf(name);
    case ArgType.STR:
      return pre.concat(name, sep, placeholderOf(name));
  }
};
