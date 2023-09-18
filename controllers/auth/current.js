import asyncHandler from "express-async-handler";
const current = asyncHandler((req, res) => {
  console.log("req--->", req.user);

  const { name, email, token, _id, avatar, posts } = req.user;

  res.json({ name, email, token, _id, avatar, posts });
});

export default current;
