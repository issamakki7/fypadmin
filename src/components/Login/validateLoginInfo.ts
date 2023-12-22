interface LoginValues {
  usernameOrEmail: string;
  pass: string;
}

export default function validateLoginInfo(loginValues: LoginValues) {
  const errors: { fields?: string; pass?: string } = {};

  if (!loginValues.usernameOrEmail.trim()) {
    errors.fields = "Username is required";
  }
  if (!loginValues.pass) {
    errors.pass = "Password is required";
  }

  return errors;
}
