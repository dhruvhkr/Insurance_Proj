const sanitizeErrorPayload = (err) => {
  const errors = {};

  if (err.code == 11000) {
    console.log(err);
    const errorKeys = Object.keys(err?.keyPattern)[0];
    errors[errorKeys] = errorKeys + " is already taken";
  }

  if (err.message.includes("Validation failed")) {
    Object.keys(err.errors).forEach((error) => {
      if (err.errors[error]) {
        errors[error] = err.errors[error].message;
      }
    });
  }
  return errors;
};

module.exports = { sanitizeErrorPayload };
