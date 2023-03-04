const PLACEHOLDER = "{}";

export const interpolate = (
  template: string,
  ...values: Array<boolean | string | number>
) => {
  const matches = template.match(new RegExp(PLACEHOLDER, "g")) || [];

  if (matches.length > values.length || values.length > matches.length) {
    throw new Error("args may be insufficient or greater than placeholder");
  }

  values.forEach((value) => {
    template = template.replace(PLACEHOLDER, String(value));
  });

  return template;
};
