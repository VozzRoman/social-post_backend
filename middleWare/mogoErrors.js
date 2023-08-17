//Проверка ошибки и изменение статус кода на нужный (включая уникальность email)
export const handleMongooseError = (error, data, next) => {
  const { code, name } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
  next();
};
