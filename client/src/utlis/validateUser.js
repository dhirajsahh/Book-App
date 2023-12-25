export const checkValidData = (username, email, password) => {
  if (!username) return "username is required ";
  if (!email) return "email is required";
  if (!password) return "password is required";
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordValid) return "Password is not valid";
  return null;
};

export const checkData = (email, password) => {
  if (!email) return "email is required";
  if (!password) return "password is required";
};
