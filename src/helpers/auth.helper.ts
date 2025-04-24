import { RegisterBody, registerBody } from "../validators/user.validator.js";

export function validateRegisterBody(
  payload: RegisterBody,
): [boolean, RegisterBody] {
  const { success, data, error } = registerBody.safeParse(payload);

  if (!success) {
    const object = error.formErrors.fieldErrors;
    const [keys, values] = [Object.keys(object), Object.values(object).flat()];

    const response = keys.reduce<Record<string, string>>((acc, elem, i) => {
      acc[elem] = values[i];
      return acc;
    }, {});

    return [false, response as RegisterBody];
  }
  return [true, data];
}
