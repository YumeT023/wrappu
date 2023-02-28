import { FormatException } from "../../@types/error";

export const format = (exception: FormatException) => {
  const { message, name, ...rest } = exception;

  const record = Object.entries(rest);

  const mapped = record.map(([k, v]) => mapRecord(k, v));

  return `${message}
    info {
      name: ${name} 
      ${mapped}
    }`;
};

const mapRecord = (key: string, value = "") => {
  return `${key}: ${value}`;
};
