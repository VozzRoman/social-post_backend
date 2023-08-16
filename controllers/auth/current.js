import asyncHandler from "express-async-handler";
const current = asyncHandler((req, res) => {
  console.log("currenr");
  console.log(req.user);
  const { name, email } = req.user;

  res.json({ name, email });
});

export default current;
