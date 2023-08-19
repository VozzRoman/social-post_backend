import asyncHandler from "express-async-handler";
const current = asyncHandler((req, res) => {
  console.log("currenr");
  console.log(req.user);
  const { name, email, token } = req.user;

  res.json({ name, email, token });
});

export default current;
