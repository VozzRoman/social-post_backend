export const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      error.status = 400;
      next(error);
    }
    next();
  };
};
