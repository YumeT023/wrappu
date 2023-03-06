const placeholder = "{}";

export const interpolate = (
  template: string,
  ...values: Array<boolean | string | number>
) => {
  const matches = template.match(new RegExp(placeholder, "g")) || [];

  if (matches.length > values.length || values.length > matches.length) {
    throw new Error("args may be insufficient or greater than placeholder");
  }

  values.forEach((value) => {
    template = template.replace(placeholder, String(value));
  });

  return template;
};

export const removePlaceholder = (s: string) => {
  return s.match(/\w+/)[0] || '';
};

export const placeholderOf = (s: string) => "{" + s + "}";

export const placeholderWithName = /{.+?}/;
