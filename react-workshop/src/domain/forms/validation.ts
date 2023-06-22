import { ValidatorFunction } from "./ValidatorFunction";

export const v = {
  required:
    (msg?: string): ValidatorFunction =>
    (val) =>
      !!val && val.length ? undefined : msg ?? "Please fill out this field",
  minLength:
    (minLength: number, msg?: string): ValidatorFunction =>
    (val) =>
      typeof val === "string" && val.length >= minLength
        ? undefined
        : msg ?? `Must be at least ${minLength} characters`,
  number:
    (msg?: string): ValidatorFunction =>
    (val) =>
      !isNaN(parseInt(val)) ? undefined : msg ?? "Must be a number",
  min:
    (min: number, msg?: string): ValidatorFunction =>
    (val) =>
      parseInt(val) >= min
        ? undefined
        : msg ?? `Must be greater or equal ${min}`,
};

export const validate = (val: any, validatorFns: ValidatorFunction[]) => {
  if (!validatorFns?.length) return undefined;
  const result = validatorFns
    .map((fn) => fn(val))
    .filter((result) => !!result) as string[];
  if (result.length) return result;
  return undefined;
};