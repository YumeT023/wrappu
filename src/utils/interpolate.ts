export const interpolate = (
  template: string,
  ...values: Array<boolean | string | number>
) => {
  const pattern = /{}/;

  const matches = template.match(new RegExp(pattern, "g")) || [];

  if (matches.length > values.length || values.length > matches.length) {
    throw new Error(
      "args may be insufficient or greater than interpolation symbol"
    );
  }

  for (const value of values) {
    template = template.replace(pattern, String(value));
  }

  return template;
};
