import asyncHandler from "express-async-handler";
const current = asyncHandler((req, res) => {
  console.log("currenr");
  console.log(req.user);
  const { name, email, token, _id } = req.user;

  res.json({ name, email, token, _id });
});

export default current;
